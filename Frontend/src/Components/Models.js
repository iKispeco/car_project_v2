import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FilteredModels from "./FilteredModels";
import { observer } from "mobx-react";
import carStore from "../Common/CarStore";
import Pagination from "./Pagination";
import Sort from "./Sort";

const Models = observer(() => {
  const {
    models,
    page,
    sort,
    fetchModels,
    fetchFilteredModels,
    deleteModel,
    toggleUpdateModel,
  } = carStore;
  const [searchModel, setSearchModel] = useState("");

  useEffect(() => {
    fetchModels();
    <Sort />;
  }, [page, sort]);

  const filterModel = (event) => {
    setSearchModel(event.target.value);
  };

  useEffect(() => {
    fetchFilteredModels(searchModel);
  }, [searchModel]);

  return (
    <div className="main-container">
      <div className="serach-sort-container">
        <label htmlFor="search-model">
          <strong>Search by model:</strong>
        </label>
        <input
          type="text"
          id="search-model"
          className="search-box"
          placeholder="X5, RAV4, Corrola..."
          onChange={filterModel}
        />
        <Sort />
      </div>

      <section>
        {searchModel === "" ? (
          <div className="main-container">
            <ul className="container">
              {models.map((model) => (
                <li key={model._id}>
                  <div className="element">
                    <h6>{model.name}</h6>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteModel(model._id)}
                    >
                      Delete
                    </button>
                    <Link to="/models/update/">
                      <button
                        className="btn btn-primary"
                        onClick={() => toggleUpdateModel(model)}
                      >
                        Update
                      </button>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
            <Pagination />
          </div>
        ) : (
          <FilteredModels />
        )}
      </section>
    </div>
  );
});

export default Models;
