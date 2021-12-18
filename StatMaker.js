const reducer = (prev, curr) => prev + curr;
const arrSum = (arr) => arr.reduce(reducer);
const arrMean = (arr) => arr.reduce(reducer)/arr.length;

function sdArr(arr){
    mean = arrMean(arr);
    dev = 0;
    for(let int of arr){
        dev +=(int - mean)**2;
    }
    return Math.sqrt(dev/arr.length);
}

class Warrior{
    constructor(name){
        this.name = name;
    }
    isStrong() {
        return this.Strength >= 13;
    }
    isSmart() {
        return this.Intelligence >= 14;
    }
}

function randn_bm() {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return randn_bm() // resample between 0 and 1
    return num
  }

function statMaker(limit, statLimit, focus){
    statLimit = Math.ceil(Math.max(limit/6, statLimit));
    let arr = Array.from({length: 6}, () => Math.ceil(randn_bm() * statLimit));;
    while(arrSum(arr) != limit){
        var remIndex = Math.floor(Math.random()*6);
        while(remIndex == 6) remIndex -= Math.ceil(Math.random()*6);
        if(arr[remIndex] >= 2 && arrSum(arr) > limit) arr[remIndex] -= 1;
        if(arr[remIndex] < statLimit && arrSum(arr) < limit) arr[remIndex] += 1;
    }
    if(focus !== undefined && arr[focus] != Math.max(...arr)) return statMaker(limit, statLimit, focus);
    else return sdArr(arr) > 2.5 ? arr : statMaker(limit, statLimit, focus);
}

function arrLabeler(labelArr = ["Strength", "Intelligence", "Wisdom", "Constitution", "Dexterity", "Charisma"], statArr){
    finalArr = []
    for(let i = 0; i < labelArr.length; i++){
        finalArr.push([labelArr[i], statArr[i]]);
    }
    return finalArr;
}

function charMaker(name, arr){
    const Fighter = new Warrior(name);
    for(let thing of arr){
        Fighter[thing[0]] = thing[1]
    }
    return Fighter
}

const char = charMaker("James the Guy", arrLabeler(undefined, statMaker(60, 20, 5)));
console.log(char);