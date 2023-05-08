import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import carStore from "../Common/CarStore";

const FilteredModels = observer(() => {
  const { filterModelArray, deleteModel, toggleUpdateModel } = carStore;
  return (
    <ul className="container">
      {filterModelArray.map((model) => (
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
  );
});

export default FilteredModels;
