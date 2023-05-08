import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import carStore from "../Common/CarStore";

const FilteredBrands = observer(() => {
  const { filterBrandArray, deleteCarBrand, toggleUpdate } = carStore;
  return (
    <ul className="container">
      {filterBrandArray.map((item) => (
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
  );
});

export default FilteredBrands;
