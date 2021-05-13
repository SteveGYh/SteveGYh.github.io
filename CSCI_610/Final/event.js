  'use strict';

  function gotKey (event) {
      
      var key = event.key;
      
      // Do something based on key press
      if (key == 'a') x += 0.1;

      if (key == 'd') x -= 0.1;
      if (key == 'r') y += 0.1;
      if (key == 'f') y -= 0.1;
      if (key == 'w') z += 0.1;
      if (key == 's') z -= 0.1;
      console.log("key press captured")
      // create a new shape and do a redo a draw
      draw();
  }
  
