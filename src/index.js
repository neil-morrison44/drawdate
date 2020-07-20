import Pressure from "pressure"

let penForce = 0.5

function drawDotAt(x, y){
  const canvas = document.getElementById("device-canvas")
  const ctx = canvas.getContext("2d")

  ctx.fillRect(Math.round(x - penForce), Math.round(y - penForce), Math.round(penForce * 2), Math.round(penForce * 2))
}


window.addEventListener("DOMContentLoaded", () => {
  Pressure.set('#device-canvas', {
    change: (force) => penForce = force * 5
  }, {polyfill: false});


  document.getElementById('device-canvas').addEventListener('touchmove', function(event){
    for(var i = 0; i < event.touches.length; i++){
         if(event.touches[i].touchType === "stylus"){
             const {clientX, clientY} = event.touches[i]
             console.log("x coordinate: " + clientX);
             console.log("y coordinate: " + clientY);
             drawDotAt(clientX, clientY)
         }
    }
});

})
