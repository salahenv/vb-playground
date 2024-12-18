function sum(a) {
    return function(b) {
        if(b) {
            var c = a + b;
            return sum(c);
        } else {
            return a;
        }
    }
}



console.log(sum(1)(2)(1)());
console.log(sum(1)(2)());
console.log(sum(2)(4)(6)());