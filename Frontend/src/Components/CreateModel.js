import carStore from "../Common/CarStore";
import { observer } from "mobx-react";

const CreateModel = observer(() => {
  const { createModelForm, updateCreateModelForm, createNewModel } = carStore;

  return (
    <div className="main-container">
      <h2>Create new model</h2>
      <form className="main-container" onSubmit={createNewModel}>
        <label>
          Car model identification (check the guide tabel &mdash;&gt;)
        </label>
        <br />
        <input
          type="number"
          name="makeId"
          onChange={updateCreateModelForm}
          value={createModelForm.makeId}
        />
        <br />
        <label>Name of the car model</label>
        <br />
        <input
          type="text"
          name="name"
          onChange={updateCreateModelForm}
          value={createModelForm.name}
        />
        <br />
        <label>Abrevation of the name (short term)</label>
        <br />
        <input
          type="text"
          name="abrv"
          onChange={updateCreateModelForm}
          value={createModelForm.abrv}
        />
        <br />
        <br />
        <button type="submit">Create model</button>
      </form>
    </div>
  );
});

export default CreateModel;
