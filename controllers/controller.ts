let car: any;

function loadForm() {
  //Selección elementos DOM

  const carDetails = document.querySelectorAll(".carDetails");
  const carWBrand = document.querySelectorAll(".wbrand");
  const carWDiameter = document.querySelectorAll(".diameter");
  const submitButton = document.querySelector("#submitCarFormButton");
  const submitWheelForm = document.querySelector("#submitWheelFormButton");

  // Variables booleanas de matricula, marca y color
  let isValidPlate: boolean = false;
  let isValidBrand: boolean = false;
  let isValidColor: boolean = false;

  // Variable Array con características coche
  let carData: string[] = [];
  let carWheelBrand: string[] = [];
  let carWheelDiam: string[] = [];

  // Activamos la función inicial para poner todo en marcha. Detalles bajo estas líneas ->
  fireCarForm();

  // Con esta función se activa el primer formulario y se añaden los listeners a campos y botón submit
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
    const carform = document.querySelector(".carform");
    const wheelform = document.querySelector(".wheelform");
    carform.classList.toggle("hidden");
    wheelform.classList.toggle("hidden");

    // se añaden los listeners para marca ruedas y diametros
    carWBrand.forEach(element => {
      element.addEventListener("keyup", wheelValidator);
    });
    carWDiameter.forEach(element => {
      element.addEventListener("change", wheelValidator);
    });
    submitWheelForm.addEventListener("click", function() {
      wheelform.classList.toggle("hidden");
      createWheel(carWheelDiam, carWheelBrand);
    });
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
    let smallAlert = event.srcElement.nextSibling.nextSibling;

    switch (event.target.id) {
      case "plate":
        isValidPlate = event.target.checkValidity();
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
    } else {
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

  function brandValidator(event: any) {
    let smallAlert = event.srcElement.nextSibling.nextSibling;
    let isValidWBrand: boolean = false;
    collectData(carWBrand, carWheelBrand);
    isValidWBrand = carWheelBrand.every(checkLength);


  }
  function wheelValidator(event: any) {
    let isValidWBrand: boolean = false;
    let isValidWheel: boolean = false;
    let smallAlert = event.srcElement.nextSibling.nextSibling;

    collectData(carWBrand, carWheelBrand);
    collectData(carWDiameter, carWheelDiam);

    isValidWBrand = carWheelBrand.every(checkLength);
    isValidWheel = carWheelDiam.every(checkValue);

    console.log(event);

    if (isValidWBrand && isValidWheel) {
      submitWheelForm.disabled = false;
      collectData(carDetails, carData);
    } else {
      submitWheelForm.disabled = true;
    }
  }

  // Creación de objeto coche y envío al DOM
  function createCar(array: string[]) {
    const carPlate = document.getElementsByClassName("carPlate");
    const carBrand = document.getElementsByClassName("carBrand");
    const carColor = document.getElementsByClassName("carColor");
    const cardDetailsContainer = document.querySelector("#carDetailsContainer");

    let tempCar = new Car(carData[0], carData[1], carData[2]);
    car = tempCar;

    carPlate[0].textContent = car.plate;
    carBrand[0].textContent = car.brand;
    carColor[0].textContent = car.color;

    cardDetailsContainer.classList.remove("hidden");
  }

  function createWheel(arrayWheel, arrayBrand) {
    const wheelButton = document.querySelector(".wheelButton");
    const wheelCard = document.querySelector("#collapseWheels");

    console.log("wheel", wheelButton, "wheelcard", wheelCard);
    for (let i = 0; i < arrayBrand.length; i++) {
      car.addWheel(new Wheel(arrayWheel[i], arrayBrand[i]));
    }

    for (let i = 0; i < 4; i++) {
      let tempBrand = document.querySelector("#wbrand" + i);
      tempBrand.textContent = car.wheels[i].brand;
      let tempWheel = document.querySelector("#wheel" + i);
      tempWheel.textContent = car.wheels[i].diameter;
    }

    wheelButton.classList.remove("hidden");
    wheelCard.classList.remove("hidden");
  }
}

document.addEventListener("DOMContentLoaded", loadForm);


