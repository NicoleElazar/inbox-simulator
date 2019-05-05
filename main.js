let boxes = document.querySelectorAll('.box');

//empty variable to hold last checked box
let lastChecked;

function handler(e) {
  // if checking + shiftKey is down
  if (this.checked){
    if (e.shiftKey) {
      if (lastChecked != undefined && this != lastChecked) {
        checkInbetween(this, lastChecked);
      }
    }
    lastChecked = this;
  }
  // clear the lastChecked variable if a box is unchecked, 
  // so shift+click after this doesn't check all boxes inbetween 
  else if (lastChecked == this) {
    lastChecked = undefined;
  } 
}

// To checkbox the boxes inbetween 2 clicks
function checkInbetween(box1, box2) {
  let checking = false;

  for (let box of boxes) {
    if (box == box1 || box == box2) {
      checking = !checking; 
    } 
    if (checking) {
      box.checked = true;
    }
  }
}

for (var box of boxes) {
    //set inital state for refresh  
    box.checked = false;
    //listener for each box in boxes array
    box.addEventListener('click', handler);
}
