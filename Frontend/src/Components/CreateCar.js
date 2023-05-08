import carStore from "../Common/CarStore";
import { observer } from "mobx-react";

const CreateCar = observer(() => {
  const { createCarForm, updateCreateCarForm, createNewBrand } = carStore;

  return (
    <div className="main-container">
      <h2>Create new car</h2>
      <form className="main-container" onSubmit={createNewBrand}>
        <label>
          Car manufacturer identification (check the guide tabel &mdash;&gt;)
        </label>
        <br />
        <input
          type="number"
          name="carId"
          onChange={updateCreateCarForm}
          value={createCarForm.carId}
        />
        <br />
        <label>Name of the manufacturer</label>
        <br />
        <input
          type="text"
          name="name"
          onChange={updateCreateCarForm}
          value={createCarForm.name}
        />
        <br />
        <label>Abrevation of the name (short term)</label>
        <br />
        <input
          type="text"
          name="abrv"
          onChange={updateCreateCarForm}
          value={createCarForm.abrv}
        />
        <br />
        <br />
        <button type="submit">Create car</button>
      </form>
    </div>
  );
});

export default CreateCar;
