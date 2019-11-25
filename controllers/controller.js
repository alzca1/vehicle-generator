//Selección elementos DOM
var carform = document.querySelector(".carform");
var wheelform = document.querySelector(".wheelform");
var carDetails = document.querySelectorAll(".carDetails");
var carWBrand = document.querySelectorAll(".wbrand");
var carWDiameter = document.querySelectorAll(".diameter");
var submitButton = document.querySelector("#submitCarFormButton");
var submitWheelForm = document.querySelector("#submitWheelFormButton");
var displayDiv = document.getElementsByClassName("carDisplay");
var wheelDisplay = document.getElementsByClassName("wheelDisplay");
// Variable Array con características coche
var carData = [];
var carWheelBrand = [];
var carWheelDiam = [];
var car;
// Variables booleanas validador características coche
var isValidPlate = false;
var isValidBrand = false;
var isValidColor = false;
var isValidWBrand = false;
var isValidWheel = false;
// Ejecución eventos (listeners de validación y click)
function fireCarForm() {
    carDetails.forEach(function (element) {
        element.addEventListener("keyup", validator);
    });
    submitButton.addEventListener("click", function () {
        createCar(carData);
        // se desactivan los listeners del carForm
        carDetails.forEach(function (element) {
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
    carWBrand.forEach(function (element) {
        element.addEventListener("keyup", wheelValidator);
    });
    carWDiameter.forEach(function (element) {
        element.addEventListener("change", wheelValidator);
    });
    submitWheelForm.addEventListener('click', function () {
        wheelform.classList.toggle('hidden');
        createWheel(carWheelDiam, carWheelBrand);
    });
}
function collectData(classGroup, array) {
    classGroup.forEach(function (element) {
        var index = element.className.replace(/\D/g, "");
        array[index] = element.value;
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
        collectData(carDetails, carData);
    }
    else {
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
function wheelValidator(event) {
    collectData(carWBrand, carWheelBrand);
    collectData(carWDiameter, carWheelDiam);
    isValidBrand = carWheelBrand.every(checkLength);
    isValidWheel = carWheelDiam.every(checkValue);
    if (isValidBrand && isValidWheel) {
        submitWheelForm.disabled = false;
        collectData(carDetails, carData);
        console.log(car);
    }
    else {
        submitWheelForm.disabled = true;
    }
}
// Creación de objeto coche y envío al DOM
function createCar(array) {
    var tempCar = new Car(carData[0], carData[1], carData[2]);
    car = tempCar;
    // car.addWheel(new Wheel(2, "SEAT"));
    var presentation = "#######CAR####### - PLATE: " + car.plate + " --BRAND: " + car.brand + " -- COLOR: " + car.color;
    displayDiv[0].textContent = presentation;
}
function createWheel(arrayWheel, arrayBrand) {
    for (var i = 0; i < arrayBrand.length; i++) {
        car.addWheel(new Wheel(arrayWheel[i], arrayBrand[i]));
    }
    var wheelPresentation = "WHEELS: " + JSON.stringify(car.wheels);
    wheelDisplay[0].textContent = wheelPresentation;
}
// function createWheels(arrayBrand, arrayWheel){
//   for(let i = 0; i < ) 
// }
document.addEventListener("DOMContentLoaded", fireCarForm);
