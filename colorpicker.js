"use strict";

// 🎁 Here you go! 🎁
function showColorInfo( rgb ) {

    document.querySelector("#r").textContent = rgb.r;
    document.querySelector("#g").textContent = rgb.g;
    document.querySelector("#b").textContent = rgb.b;

    const hex = "#"+rgb.r.toString(16).padStart(2,"0")
                   +rgb.g.toString(16).padStart(2,"0")
                   +rgb.b.toString(16).padStart(2,"0");

    document.querySelector("#hex").textContent = hex;

    document.querySelector("#colorbox").style.backgroundColor = hex;
}

    let canvas;
    let ctx;
      //Declaring global variables to contain reference to the X and Y values of the mouse when it is moved over the canvas

      let mouseOverCanvasX;
      let mouseOverCanvasY;
  
      // Creating new canvas for small rectangle around mouse
      let ctxZoom = document.getElementById('zoomCanvas').getContext('2d');
  
      let canvasR;
      let canvasG;
      let canvasB;
      let rgb;
    
   
    window.addEventListener("load", init);

    function init (){
        
        draw();
    }

    function draw(){
        canvas = document.getElementById('imageCanvas');
        ctx = canvas.getContext('2d');

        let image = new Image();
        image.onload = function(){
            ctx.drawImage(image, 0, 0);
        };

        image.src = "cat.jpg";
        canvas.addEventListener('mousemove', mouseMoved);
    }

  


// The function below is the function that is being called when the mouse is being moved over the canvas, because of the event listener called 'mousemove'
    function mouseMoved(event){ 
        console.log("y:" + event.layerX);
        console.log("x:" + event.layerY);

        /* DOESNT WORK BECAUSE clientX and clientY values returned from the event is for the entire window
        mouseOverCanvasX = event.clientX;
        mouseOverCanvasY = event.clientY;
        */

        //Below works, because is it getting the x and y from the canvas layer only.
       mouseOverCanvasX = event.layerX;
       mouseOverCanvasY = event.layerY;

       ctx.rect(mouseOverCanvasX - 7.5, mouseOverCanvasY -5, 15, 10);
       ctx.stroke();
       ctx.strokeStyle = "green";

       ctxZoom.fill();

       let imageData = ctx.getImageData(mouseOverCanvasX -7.5, mouseOverCanvasY -5, 15, 10);
       ctxZoom.putImageData(imageData, 0, 0);

       console.log(imageData)

       canvasR = imageData.data[0];
       canvasG = imageData.data[1];
       canvasB = imageData.data[2];     
       
    }

    