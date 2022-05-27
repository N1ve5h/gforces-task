const mongoose = require("mongoose");
const Car = require("./Models/vehicleSchema");
const uuid = require("uuid");
const { v4: uuidv4 } = uuid;

mongoose
  .connect("mongodb://localhost:27017/vehicleOrderInfo")
  .then(() => {
    console.log("Connected to the Database");
  })
  .catch((err) => {
    console.log("Can not connect to Database");
    console.log(err);
  });
let id = uuidv4();
let newCar = {
  uuid: id,
  model: "Corsa",
  manufacturer: "Vauxhall",
  price: "5000",
};

const saveSeed = async () => {
    let car = new Car(newCar);
    await car.save();
}

saveSeed();