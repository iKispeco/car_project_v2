import carStore from "../Common/CarStore";
import { observer } from "mobx-react";

const UpdateModel = observer(() => {
  const { updateModelForm, handleUpdateModelForm, updateModel } = carStore;

  return (
    <div>
      <form onSubmit={updateModel}>
        <label>
          Car model identification (check the guide tabel &mdash;&gt;)
        </label>
        <br />
        <input
          type="number"
          name="makeId"
          onChange={handleUpdateModelForm}
          value={updateModelForm.makeId}
        />
        <br />
        <label>Update name of the model</label>
        <br />
        <input
          type="text"
          name="name"
          onChange={handleUpdateModelForm}
          value={updateModelForm.name}
        />
        <br />
        <label>Update abrevation of the name (short term)</label>
        <br />
        <input
          type="text"
          name="abrv"
          onChange={handleUpdateModelForm}
          value={updateModelForm.abrv}
        />
        <br />
        <br />
        <button type="submit">Update model</button>
      </form>
    </div>
  );
});

export default UpdateModel;
