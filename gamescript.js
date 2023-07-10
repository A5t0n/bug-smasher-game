var customCursor=document.getElementById("customCursor");
    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");
    var bugImg = new Image();
    bugImg.src = "http://clipart-library.com/images_k/ladybug-transparent-background/ladybug-transparent-background-15.png";
    var bugSize = 50;
    var bugX, bugY;
	var hitboxSize=100;
    var score = 0;
    var interval = 1000; 
    var intervalId;

   
    canvas.addEventListener("click", handleClick);
	document.addEventListener("mousemove",moveCursor);

    
    bugImg.onload = function() {
      
      resetBug();
      intervalId = setInterval(moveBug, interval);
    };

   
	function moveCursor(event)
	{
	  customCursor.style.display="block";
	  customCursor.style.left = event.clientX - customCursor.width / 2 + "px";
	  customCursor.style.top = event.clientY - customCursor.height / 2 + "px";
	}

    function resetBug() {
      bugX = Math.random() * (canvas.width - bugSize);
      bugY = Math.random() * (canvas.height - bugSize);
    }

    function drawBug() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bugImg, bugX, bugY, bugSize, bugSize);
    }

    function drawScore() {
		ctx.font = "30px Arial";
      ctx.textAlign = "center";

      
      ctx.fillStyle = "#F0F0F0"; 
      var textWidth = ctx.measureText("Score: " + score).width;
      var rectPadding = 10;
      var rectX = canvas.width / 2 - textWidth / 2 - rectPadding;
      var rectY = 10;
      var rectWidth = textWidth + rectPadding * 2;
      var rectHeight = 40;
      ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

      
      ctx.fillStyle = "#000";
      ctx.fillText("Score: " + score, canvas.width / 2, 40);
    }

    function moveBug() {
      
      var maxX = canvas.width - bugSize;
      var maxY = canvas.height - bugSize;
      bugX = Math.random() * maxX;
      bugY = Math.random() * maxY;

      drawBug();
      drawScore();
    }

    function handleClick(event) {
      var mouseX = event.clientX - canvas.offsetLeft;
      var mouseY = event.clientY - canvas.offsetTop;

      if (
        mouseX >= bugX-hitboxSize/2 &&
        mouseX <= bugX + bugSize+hitboxSize/2 &&
        mouseY >= bugY-hitboxSize/2 &&
        mouseY <= bugY + bugSize+hitboxSize/2
      ) {
        
        score++;
        interval -= 20; 
        resetBug();
        clearInterval(intervalId);
        intervalId = setInterval(moveBug, interval);
      }
    }

    function resetScore() {
      score = 0;
    }

    function resetSpeed() {
      interval = 1000; 
      clearInterval(intervalId);
      intervalId = setInterval(moveBug, interval);
    }