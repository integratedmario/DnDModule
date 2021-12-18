let testArr = [...Array(11).keys()].splice(1);

const squareFunc = (...args) => args.map(x => x*2);

const isEven = (currentValue) => currentValue%2 == 0;

const evenCheck = (...args) => args.every(isEven);

console.log(evenCheck(6, 8, 12));

class Person{
    constructor(name){
        this.name = name;
    }
}

const Mario = new Person("Mario");
console.log(Mario.name);
console.log(testArr.map(x => x*2).every(isEven));