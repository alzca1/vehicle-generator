//Selección elementos DOM
var carDetails = document.querySelectorAll(".carDetails");
var carBrand = document.querySelectorAll(".brand");
var submitButton = document.querySelector("button");
var displayDiv = document.getElementsByClassName("carDisplay");
console.log(carBrand);
// Variable Array con características coche
var carData = [];
var carWheelBrand = [];
var carWheelDiam = [];
// Variables booleanas validador características coche
var isValidPlate = false;
var isValidBrand = false;
var isValidColor = false;
// Ejecución eventos (listeners de validación y click)
function fireEvents() {
    carDetails.forEach(function (element) {
        element.addEventListener("change", validator);
    });
    submitButton.addEventListener("click", function () {
        createCar(carData);
    });
    // carBrand.forEach(element => {
    //   element.addEventListener("click", validator);
    // });
}
// recolección de datos de formulario inicial
// y envío a variable array carData
function collectData() {
    carDetails.forEach(function (element) {
        var index = element.className.replace(/\D/g, "");
        carData[index] = element.value;
    });
    carBrand.forEach(function (element) {
        var index = element.className.replace(/\D/g, "");
        carWheelBrand[index] = element.value;
        console.log(carWheelBrand);
    });
}
//validador con switch de campos
// ###TAREA###: validación matrículas!!!!
function validator(event) {
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
        collectData();
    }
    else {
        submitButton.disabled = true;
    }
}
// Creación de objeto coche y envío al DOM
function createCar(array) {
    var car = new Car(carData[0], carData[1], carData[2]);
    // car.addWheel(new Wheel(2, "SEAT"));
    var presentation = "#######CAR####### - PLATE: " + car.plate + " -- COLOR: " + car.color + " -- WHEELS: " + JSON.stringify(car.wheels);
    displayDiv[0].textContent = presentation;
}
document.addEventListener("DOMContentLoaded", fireEvents);
