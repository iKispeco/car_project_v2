import { observer } from "mobx-react";
import carStore from "../Common/CarStore";

const Sort = observer(() => {
  const { sort, onSelectChange, onArrowChange } = carStore;

  return (
    <div className="sort-container">
      <p>
        <strong>Sort By:</strong>
      </p>
      <select
        className="select"
        defaultValue={sort.sort}
        onChange={(e) =>
          onSelectChange({ sort: e.target.value, order: sort.order })
        }
      >
        <option value="name">Name</option>
        <option value="abrv">Abbreviation</option>
      </select>
      <button className="arrow-btn" onClick={onArrowChange}>
        <p className="arrows">&uarr;</p>
        <p className="arrows">&darr;</p>
      </button>
    </div>
  );
});

export default Sort;
