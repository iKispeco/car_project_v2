import carStore from "../Common/CarStore";
import { observer } from "mobx-react";

const UpdateCar = observer(() => {
  const { updateCarForm, handleUpdateCarForm, updateCar } = carStore;

  return (
    <div>
      <form onSubmit={updateCar}>
        <label>
          Car manufacturer identification (check the guide tabel &mdash;&gt;)
        </label>
        <br />
        <input
          type="number"
          name="carId"
          onChange={handleUpdateCarForm}
          value={updateCarForm.carId}
        />
        <br />
        <label>Update name of the manufacturer</label>
        <br />
        <input
          type="text"
          name="name"
          onChange={handleUpdateCarForm}
          value={updateCarForm.name}
        />
        <br />
        <label>Update abrevation of the name (short term)</label>
        <br />
        <input
          type="text"
          name="abrv"
          onChange={handleUpdateCarForm}
          value={updateCarForm.abrv}
        />
        <br />
        <br />
        <button type="submit">Update car</button>
      </form>
    </div>
  );
});

export default UpdateCar;
