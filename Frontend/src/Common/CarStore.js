import { observable, action, makeObservable } from "mobx";
import axios from "axios";

class CarStore {
  data = [];
  models = [];
  filterBrandArray = [];
  filterModelArray = [];
  createCarForm = {
    carId: Number(""),
    name: "",
    abrv: "",
  };
  updateCarForm = {
    _id: null,
    carId: Number(""),
    name: "",
    abrv: "",
  };
  createModelForm = {
    makeId: Number(""),
    name: "",
    abrv: "",
  };
  updateModelForm = {
    _id: null,
    makeId: Number(""),
    name: "",
    abrv: "",
  };
  sort = { sort: "name", order: "desc" };
  page = 1;
  pages = 1;
  loading = false;

  constructor() {
    makeObservable(this, {
      data: observable,
      models: observable,
      filterBrandArray: observable,
      filterModelArray: observable,
      createCarForm: observable,
      updateCarForm: observable,
      createModelForm: observable,
      updateModelForm: observable,
      sort: observable,
      page: observable,
      pages: observable,

      fetchBrands: action,
      fetchModels: action,
      fetchFilteredBrands: action,
      fetchFilteredModels: action,
      updateCreateCarForm: action,
      createNewBrand: action,
      updateCar: action,
      updateCreateModelForm: action,
      createNewModel: action,
      updateModel: action,
      changePage: action,
      changePage1: action,
      changePage2: action,
      changePage3: action,
      changePage4: action,
      onSelectChange: action,
    });
  }

  // SECTION WITH FETCHING DATA FROM SERVER METHODS

  fetchBrands = async () => {
    const res = await axios.get("http://localhost:8000/cars");
    this.data = res.data;
  };

  fetchModels = async () => {
    this.loading = true;
    try {
      const res = await axios.get(
        `http://localhost:8000/models?page=${this.page}&sort=${this.sort.sort},${this.sort.order}`
      );
      const { modelsData, pages: totalPages } = res.data;

      this.pages = totalPages;
      this.models = modelsData;
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH ONLY FILTERED BRANDS FROM DATABASE
  fetchFilteredBrands = async (string) => {
    const res = await axios.get(
      `http://localhost:8000/cars/search?name=${string}`
    );
    this.filterBrandArray = res.data;
  };

  // FETCH ONLY FILTERED MODELS FROM DATABASE
  fetchFilteredModels = async (string) => {
    const res = await axios.get(
      `http://localhost:8000/models/search?name=${string}`
    );
    this.filterModelArray = res.data;
  };

  // PAGINATION METHODS
  changePage1 = (index) => {
    this.page = this.page - 1 + index + 1;
  };

  changePage2 = () => {
    this.page = this.pages;
  };

  changePage = (num) => {
    this.page = this.page + num;
  };
  changePage3 = () => {
    this.page = 1;
  };
  changePage4 = () => {
    this.page = this.page - 1;
  };

  // SORTING METHODS
  onSelectChange = ({ sort, order }) => {
    this.sort = { sort, order };
  };

  onArrowChange = () => {
    if (this.sort.order === "asc") {
      this.sort = { sort: this.sort.sort, order: "desc" };
    } else {
      this.sort = { sort: this.sort.sort, order: "asc" };
    }
  };

  // **************************************************
  // ************** CAR BRAND CRUD METHODS *****************
  // **************************************************
  updateCreateCarForm = (e) => {
    const { name, value } = e.target;
    this.createCarForm = {
      ...this.createCarForm,
      [name]: value,
    };
  };

  createNewBrand = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/cars", this.createCarForm);
    this.createCarForm = {
      carId: Number(""),
      name: "",
      abrv: "",
    };
  };

  deleteCarBrand = async (_id) => {
    await axios.delete(`http://localhost:8000/cars/${_id}`);
    console.log("im deleting: " + _id);
    const newData = [...this.data].filter((car) => {
      return car._id !== _id;
    });
    this.data = newData;
  };

  handleUpdateCarForm = (e) => {
    const { name, value } = e.target;
    this.updateCarForm = {
      ...this.updateCarForm,
      [name]: value,
    };
  };

  toggleUpdate = (item) => {
    this.updateCarForm = {
      _id: item._id,
      carId: item.carId,
      name: item.name,
      abrv: item.abrv,
    };
    console.log(this.updateCarForm._id);
  };

  updateCar = async (e) => {
    e.preventDefault();
    const { carId, name, abrv } = this.updateCarForm;
    await axios.patch(`http://localhost:8000/cars/${this.updateCarForm._id}`, {
      carId,
      name,
      abrv,
    });
    this.updateCarForm = {
      carId: Number(""),
      name: "",
      abrv: "",
    };
  };

  // **************************************************
  // ************** CAR MODEL CRUD METHODS *****************
  // **************************************************
  updateCreateModelForm = (e) => {
    const { name, value } = e.target;
    this.createModelForm = {
      ...this.createModelForm,
      [name]: value,
    };
  };

  createNewModel = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/models", this.createModelForm);
    this.createModelForm = {
      makeId: Number(""),
      name: "",
      abrv: "",
    };
  };

  deleteModel = async (_id) => {
    await axios.delete(`http://localhost:8000/models/${_id}`);
    console.log("im deleting: " + _id);
    const newData = [...this.models].filter((item) => {
      return item._id !== _id;
    });
    this.models = newData;
  };

  handleUpdateModelForm = (e) => {
    const { name, value } = e.target;
    this.updateModelForm = {
      ...this.updateModelForm,
      [name]: value,
    };
  };

  toggleUpdateModel = (model) => {
    this.updateModelForm = {
      _id: model._id,
      makeId: model.makeId,
      name: model.name,
      abrv: model.abrv,
    };
    console.log(this.updateModelForm._id);
  };

  updateModel = async (e) => {
    e.preventDefault();
    const { makeId, name, abrv } = this.updateModelForm;
    await axios.patch(
      `http://localhost:8000/models/${this.updateModelForm._id}`,
      {
        makeId,
        name,
        abrv,
      }
    );
    this.updateModelForm = {
      makeId: Number(""),
      name: "",
      abrv: "",
    };
  };
}
const carStore = new CarStore();

export default carStore;
