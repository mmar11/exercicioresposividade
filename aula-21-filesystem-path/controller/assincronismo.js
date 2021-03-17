function alarme1() {
    return "hora de acordar, são 8h"
}

function alarme2() {
    return "esta perto da sua hora de acordar são 7:50"
}

setTimeout(function() {
    console.log(alarme1())
}, 2500)
console.log(alarme2())