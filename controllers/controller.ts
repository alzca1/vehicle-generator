//Selección elementos DOM
const carform = document.querySelector(".carform");
const wheelform = document.querySelector(".wheelform");
const carDetails = document.querySelectorAll(".carDetails");
const carWBrand = document.querySelectorAll(".wbrand");
const carWDiameter = document.querySelectorAll(".diameter");
const submitButton = document.querySelector("#submitCarFormButton");
const submitWheelForm = document.querySelector("#submitWheelFormButton")
const displayDiv = document.getElementsByClassName("carDisplay");

// Variable Array con características coche
let carData: string[] = [];
let carWheelBrand: string[] = [];
let carWheelDiam: string[] = [];

// Variables booleanas validador características coche
let isValidPlate: boolean = false;
let isValidBrand: boolean = false;
let isValidColor: boolean = false;
let isValidWBrand: boolean = false;
let isValidWheel: boolean = false;
// Ejecución eventos (listeners de validación y click)

function fireCarForm() {
  carDetails.forEach(element => {
    element.addEventListener("keyup", validator);
  });
  submitButton.addEventListener("click", function() {
    createCar(carData);
    // se desactivan los listeners del carForm
    carDetails.forEach(element => {
      element.removeEventListener("change", validator);
    });
    // una vez se crea el coche se activa el wheelForm
    fireWheelForm();
  });
}

function fireWheelForm() {
  carform.classList.toggle("hidden");
  wheelform.classList.toggle("hidden");

  // se añaden los listeners para marca ruedas y diametros
  carWBrand.forEach(element => {
    element.addEventListener("keyup", wheelValidator);
  });
  carWDiameter.forEach(element => {
    element.addEventListener("change", wheelValidator)
  })
}

function collectData(classGroup, array) {
  classGroup.forEach(element => {
    var index = element.className.replace(/\D/g, "");
    array[index] = element.value;
  });
}

//validador con switch de campos
// ###TAREA###: validación matrículas!!!!
function validator(event: any) {
  switch (event.target.id) {
    case "plate":
      isValidPlate = event.target.checkValidity();
      break;
    case "brand":
      isValidBrand = event.target.checkValidity();
      break;
    case "color":
      isValidColor = event.target.checkValidity();
      break;
  }

  //Activador botón submit si validadores son todos true;

  if (isValidPlate && isValidBrand && isValidColor) {
    submitButton.disabled = false;
    collectData(carDetails, carData);
  } else {
    submitButton.disabled = true;
  }
}

function checkLength(element) {
  return element.length >= 3;
}

function checkValue(element) {
  console.log(element);
  if (element >= 0.4) {
    if (element <= 2) {
      return element;
    }
  }
}

function wheelValidator(event: any) {
  collectData(carWBrand, carWheelBrand);
  collectData(carWDiameter, carWheelDiam);
  isValidBrand = carWheelBrand.every(checkLength);
  isValidWheel = carWheelDiam.every(checkValue);

  if (isValidBrand && isValidWheel) {
    submitWheelForm.disabled = false;
    collectData(carDetails, carData);
  } else {
    submitWheelForm.disabled = true;
  }
}

// Creación de objeto coche y envío al DOM
function createCar(array: string[]) {
  let car = new Car(carData[0], carData[1], carData[2]);

  // car.addWheel(new Wheel(2, "SEAT"));
  let presentation = `#######CAR####### - PLATE: ${car.plate} --BRAND: ${
    car.brand
  } -- COLOR: ${car.color} -- WHEELS: ${JSON.stringify(car.wheels)}`;
  displayDiv[0].textContent = presentation;
}

document.addEventListener("DOMContentLoaded", fireCarForm);
