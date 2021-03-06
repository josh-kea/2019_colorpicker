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

        let image;    
        let canvas = document.getElementById('imageCanvas');
        let ctx = canvas.getContext('2d');
        let w = canvas.width;
        let h = canvas.height;

      // Creating new canvas for small rectangle around mouse
      let ctxZoom = document.getElementById('zoomCanvas').getContext('2d');
      
      //Declaring global variables to contain reference to the X and Y values of the mouse when it is moved over the canvas

      let mouseOverCanvasX;
      let mouseOverCanvasY;

      let imageData;

  
      let canvasR;
      let canvasG;
      let canvasB;
      let rgb = {r,g,b};

   
    window.addEventListener("load", draw);
    canvas.addEventListener('mousemove', mouseMoved);


    function draw(){
        
        //Getting height and width from the canvas
        image = new Image();
        
        image.onload = function(){
            ctx.drawImage(image, 0, 0);
            imageData = ctx.getImageData(0,0,w,h);            
        };
        
        image.src = "cat.jpg";
     }

  


// The function below is the function that is being called when the mouse is being moved over the canvas, because of the event listener called 'mousemove'
    function mouseMoved(event){ 
        console.log("y:" + event.offsetX);
        console.log("x:" + event.offsetY);
        ctx.putImageData(imageData, 0, 0);
       

        /* DOESNT WORK BECAUSE clientX and clientY values returned from the event is for the entire window
        mouseOverCanvasX = event.clientX;
        mouseOverCanvasY = event.clientY;
        */

        //Below works, because is it getting the x and y from the canvas layer only.
       mouseOverCanvasX = event.offsetX;
       mouseOverCanvasY = event.offsetY;

       
       ctx.rect(mouseOverCanvasX - 7.5, mouseOverCanvasY -5, 15, 10);
       ctx.stroke();
       ctx.strokeStyle = "green";

      

       imageData = ctx.getImageData(mouseOverCanvasX, mouseOverCanvasY, w, h);
       ctxZoom.putImageData(imageData, 0, 0);

       console.log("image data" + imageData.data.length)

       let pixelIndex = (4 * (mouseOverCanvasX + mouseOverCanvasY * w))

       canvasR = imageData.data[0];
       canvasG = imageData.data[1];
       canvasB = imageData.data[2];  

       console.log(pixelIndex)
       
       rgb.r = canvasR;
       rgb.g = canvasG;
       rgb.b = canvasB;

       showColorInfo(rgb);
       
       console.log("hello" + canvasR);
      
    }


    