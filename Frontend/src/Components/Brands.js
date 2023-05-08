import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import FilteredBrands from "./FilteredBrands";
import carStore from "../Common/CarStore";
import { Link } from "react-router-dom";

const Brands = observer(() => {
  const { data } = carStore;
  const [searchBrand, setSearchBrand] = useState("");
  const { fetchBrands, fetchFilteredBrands, deleteCarBrand, toggleUpdate } =
    carStore;

  const filterBrand = (event) => {
    setSearchBrand(event.target.value);
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    fetchFilteredBrands(searchBrand);
  }, [searchBrand]);

  if (!Array.isArray(data)) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="main-container">
      <div style={{ margin: 20 }}>
        <label htmlFor="search">
          <strong>Search by brand:</strong>
        </label>
        <input
          type="text"
          id="search"
          className="search-box"
          placeholder="Mercedes-Benz, Tesla, Ford..."
          onChange={filterBrand}
        />
      </div>

      <section>
        {searchBrand === "" ? (
          <ul className="container">
            {data.map((item) => (
              <li key={item._id}>
                <div className="element">
                  <h5>{item.name}</h5>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteCarBrand(item._id)}
                  >
                    Delete
                  </button>
                  <Link to="/brands/update/">
                    <button
                      className="btn btn-primary"
                      onClick={() => toggleUpdate(item)}
                    >
                      Update
                    </button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <FilteredBrands />
        )}
      </section>
    </div>
  );
});

export default Brands;
