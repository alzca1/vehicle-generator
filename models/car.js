var Car = /** @class */ (function () {
    function Car(plate, brand, color) {
        this.wheels = new Array();
        this.plate = plate;
        this.brand = brand;
        this.color = color;
    }
    Car.prototype.addWheel = function (wheel) {
        this.wheels.push(wheel);
    };
    return Car;
}());
