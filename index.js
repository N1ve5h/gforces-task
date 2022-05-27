const express = require("express");
var methodOverride = require("method-override");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Car = require("./Models/vehicleSchema");
const { urlencoded } = require("express");
const uuid = require("uuid");
const { v4: uuidv4 } = uuid;

mongoose
  .connect("mongodb://localhost:27017/vehicleOrderInfo") //connect to a database (local)
  .then(() => {
    console.log("Connected to the Database");
  })
  .catch((err) => {
    console.log("Can not connect to Database");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views")); //finding directories for the application's views
app.set("view engine", "ejs"); //default engine extension: ejs
app.use(urlencoded({ extended: true }));
app.use(methodOverride("_method")); //Override using a query value


app.get("/", async (req, res) => {
  const cars = await Car.find({});
  res.render("cars/index", { cars });
});

app.get("/new", (req, res) => {
  res.render("cars/new");
});

app.post("/", async (req, res) => {
  let id = uuidv4(); //create uuid
  let {model , manufacturer, price} = req.body; //deconstruct to extract relevant data.
  if (isNaN(Number(price))) return res.send('Error, please only enter a number in the price.'); //check price is a number
  let car = {uuid:id, model: model, manufacturer:manufacturer, price:price};
  const newCar = new Car(car);
  await newCar.save();
  res.send(`${id} has been saved to the database`);
});

app.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const car = await Car.findById(id);
  res.render("cars/edit", { car });
});

app.put("/:id", async (req, res) => {
  let {uuid, model , manufacturer, price} = req.body;
  const car = await Car.findOneAndUpdate(uuid, {model:model, manufacturer:manufacturer, price:price}, {runValidators: true, new:true});
  console.log(car);
  res.redirect(`/`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
