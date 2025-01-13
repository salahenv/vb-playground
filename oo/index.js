// different ways to create object
// method 1
// factory method to create object
//
function person (name) {
    return {
        name: name,
        getName: function() {
            return 'hello ' + this.name
        }
    }
}

const person1 = person('salah');
const p1name = person1.getName();
console.log('factory method to create object', p1name);

// method 2
// constructure method
//
function Person (name) {
    this.name = name;
    this.getName = function () {
        return 'hello ' + name
    }
}

const person2 = new Person('shaista');
// what new is doing here ?
// 1. creating an object {},
// 2. providing above created object as a this to its constructor function
// 3. implicitly return the this variable from its constructor function
const p2name = person2.getName();
console.log('constructure method to create object', p2name);

// method 3
// object literal syntax
//

const a = {};
// how js treat above syntax
// js is actually considering it as below
const b = new Object();
// in above b will be {} equivalent to object literal

// Similer to new Object() there are few more constructor like below

const str = new String(); 
// above one is same as below
const str1 = '';
// or
const str2 = "";
// or
const str3 = ``;

const flag = new Boolean();
const num = new Number();
