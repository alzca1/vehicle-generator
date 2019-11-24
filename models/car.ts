class Car{
    plate:string;
    brand:string;
    color:string;
    wheels:Wheel[]=new Array();
    
    constructor(plate:string,brand:string,color:string){
        this.plate=plate;
        this.brand=brand;
        this.color=color;
    }
    
    addWheel(wheel:Wheel):void{
        this.wheels.push(wheel);
    }
}