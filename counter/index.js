var currentCounterValue = 0;
var currentStepValue = 1;

var incBtn = document.getElementById('inc');
var decBtn = document.getElementById('dec');
var currentCounterElm = document.getElementById('current_counter');
var stepInputElm = document.getElementById('step');
var resetBtn = document.getElementById('reset');

stepInputElm.addEventListener('change', function(event) {
    currentStepValue = event.target.value;
});

incBtn.addEventListener('click', function() {
    currentCounterValue = parseInt(currentCounterValue) + parseInt(currentStepValue);
    currentCounterElm.innerText = currentCounterValue;
});

decBtn.addEventListener('click', function() {
    currentCounterValue = parseInt(currentCounterValue) - parseInt(currentStepValue);
    currentCounterElm.innerText = currentCounterValue;
});

resetBtn.addEventListener('click', function(){
    currentCounterValue = 0;
    currentStepValue = 1;
    currentCounterElm.innerText = currentCounterValue;
    stepInputElm.value = currentStepValue;
})