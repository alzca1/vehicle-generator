var car;
function loadForm() {
    //Selección elementos DOM
    var carDetails = document.querySelectorAll(".carDetails");
    var carWBrand = document.querySelectorAll(".wbrand");
    var carWDiameter = document.querySelectorAll(".diameter");
    var submitButton = document.querySelector("#submitCarFormButton");
    var submitWheelForm = document.querySelector("#submitWheelFormButton");
    var isValidPlate = false;
    var isValidBrand = false;
    var isValidColor = false;
    // Variable Array con características coche
    var carData = [];
    var carWheelBrand = [];
    var carWheelDiam = [];
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
    fireCarForm();
    function fireWheelForm() {
        var carform = document.querySelector(".carform");
        var wheelform = document.querySelector(".wheelform");
        carform.classList.toggle("hidden");
        wheelform.classList.toggle("hidden");
        // se añaden los listeners para marca ruedas y diametros
        carWBrand.forEach(function (element) {
            element.addEventListener("keyup", wheelValidator);
        });
        carWDiameter.forEach(function (element) {
            element.addEventListener("change", wheelValidator);
        });
        submitWheelForm.addEventListener("click", function () {
            wheelform.classList.toggle("hidden");
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
        console.log(" isValidPlate: " + isValidPlate + ", isValidBrand: " + isValidBrand + ", isValidColor: " + isValidColor);
        switch (event.target.id) {
            case "plate":
                isValidPlate = event.target.checkValidity();
                console.log();
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
            console.log(submitButton);
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
        var isValidWBrand = false;
        var isValidWheel = false;
        collectData(carWBrand, carWheelBrand);
        collectData(carWDiameter, carWheelDiam);
        isValidWBrand = carWheelBrand.every(checkLength);
        isValidWheel = carWheelDiam.every(checkValue);
        if (isValidWBrand && isValidWheel) {
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
        var carPlate = document.getElementsByClassName("carPlate");
        var carBrand = document.getElementsByClassName("carBrand");
        var carColor = document.getElementsByClassName("carColor");
        var cardDetailsContainer = document.querySelector("#carDetailsContainer");
        console.log(carPlate, carBrand, carColor);
        var tempCar = new Car(carData[0], carData[1], carData[2]);
        car = tempCar;
        carPlate[0].textContent = car.plate;
        carBrand[0].textContent = car.brand;
        carColor[0].textContent = car.color;
        cardDetailsContainer.classList.remove('hidden');
    }
    function createWheel(arrayWheel, arrayBrand) {
        var wheelDisplay = document.getElementsByClassName("wheelDisplay");
        for (var i = 0; i < arrayBrand.length; i++) {
            car.addWheel(new Wheel(arrayWheel[i], arrayBrand[i]));
        }
        for (var i = 0; i < 4; i++) {
            var tempBrand = document.querySelector("#wbrand" + i);
            tempBrand.textContent = car.wheels[i].brand;
            var tempWheel = document.querySelector("#wheel" + i);
            tempWheel.textContent = car.wheels[i].diameter;
        }
    }
}
document.addEventListener("DOMContentLoaded", loadForm);
