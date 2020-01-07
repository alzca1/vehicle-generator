var car;
function loadForm() {
    //Selección elementos DOM
    var carDetails = document.querySelectorAll(".carDetails");
    var carWBrand = document.querySelectorAll(".wbrand");
    var carWDiameter = document.querySelectorAll(".diameter");
    var submitButton = document.querySelector("#submitCarFormButton");
    var submitWheelForm = document.querySelector("#submitWheelFormButton");
    // Variables booleanas de matricula, marca y color
    var isValidPlate = false;
    var isValidBrand = false;
    var isValidColor = false;
    // Variable Array con características coche
    var carData = [];
    var carWheelBrand = [];
    var carWheelDiam = [];
    // Activamos la función inicial para poner todo en marcha. Detalles bajo estas líneas ->
    fireCarForm();
    // Con esta función se activa el primer formulario y se añaden los listeners a campos y botón submit
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
        var smallAlert = event.srcElement.nextSibling.nextSibling;
        switch (event.target.id) {
            case "plate":
                var reg = /^[0-9]{4}[a-zA-Z]{3}$/
                
                isValidPlate = reg.test(event.target.value)
                console.log(event.srcElement.nextSibling.nextSibling.classList);
                !isValidPlate
                    ? smallAlert.classList.remove("hidden")
                    : smallAlert.classList.add("hidden");
                break;
            case "brand":
                isValidBrand = event.target.checkValidity();
                !isValidBrand
                    ? smallAlert.classList.remove("hidden")
                    : smallAlert.classList.add("hidden");
                break;
            case "color":
                isValidColor = event.target.checkValidity();
                !isValidColor
                    ? smallAlert.classList.remove("hidden")
                    : smallAlert.classList.add("hidden");
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
        if (element >= 0.4) {
            if (element <= 2) {
                return element;
            }
        }
    }
    function brandValidator(event) {
        var smallAlert = event.srcElement.nextSibling.nextSibling;
        var isValidWBrand = false;
        collectData(carWBrand, carWheelBrand);
        isValidWBrand = carWheelBrand.every(checkLength);
    }
    function wheelValidator(event) {
        var isValidWBrand = false;
        var isValidWheel = false;
        var smallAlert = event.srcElement.nextSibling.nextSibling;
        collectData(carWBrand, carWheelBrand);
        collectData(carWDiameter, carWheelDiam);
        isValidWBrand = carWheelBrand.every(checkLength);
        isValidWheel = carWheelDiam.every(checkValue);
        console.log(event);
        if (isValidWBrand && isValidWheel) {
            submitWheelForm.disabled = false;
            collectData(carDetails, carData);
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
        var tempCar = new Car(carData[0], carData[1], carData[2]);
        car = tempCar;
        carPlate[0].textContent = car.plate;
        carBrand[0].textContent = car.brand;
        carColor[0].textContent = car.color;
        cardDetailsContainer.classList.remove("hidden");
    }
    function createWheel(arrayWheel, arrayBrand) {
        var wheelButton = document.querySelector(".wheelButton");
        var wheelCard = document.querySelector("#collapseWheels");
        console.log("wheel", wheelButton, "wheelcard", wheelCard);
        for (var i = 0; i < arrayBrand.length; i++) {
            car.addWheel(new Wheel(arrayWheel[i], arrayBrand[i]));
        }
        for (var i = 0; i < 4; i++) {
            var tempBrand = document.querySelector("#wbrand" + i);
            tempBrand.textContent = car.wheels[i].brand;
            var tempWheel = document.querySelector("#wheel" + i);
            tempWheel.textContent = car.wheels[i].diameter;
        }
        wheelButton.classList.remove("hidden");
        wheelCard.classList.remove("hidden");
    }
}
document.addEventListener("DOMContentLoaded", loadForm);
