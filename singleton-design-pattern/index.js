// A constructor
function Counter() {
    this.count = 0;
    this.increament = function() {
        this.count++;
    }
    this.decreament = function() {
        this.count--;
    }
}

// Accept a constructor object contain getInstance
function singleton(constructor) {
    let instance;

    function createInstance() {
        const counter = new constructor();
        return counter;
    }

    return {
        getInstance: function() {
            if(instance) {
                return instance;
            } else {
                instance = createInstance();
                return instance;
            }
        }
    }
}

// 
const singletonObj = singleton(Counter);
const instanceOne = singletonObj.getInstance();
const instanceTwo = singletonObj.getInstance();
console.log('both same instance', instanceOne === instanceTwo);
