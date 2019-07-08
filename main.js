
//querySelectorAll creates a Node List not an array. Therefore copying it into a new array so array methods can be used on it later. 
let boxes = Array.from(document.querySelectorAll('.box'));
let emailDivs = Array.from(document.querySelectorAll('.one-email'));
const selectAll = document.querySelector('.select-all');
const deleteButton = document.querySelector('.delete');
let mainContainer = document.querySelector('.inbox');


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

// To check the boxes inbetween 2 clicks
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

for (let box of boxes) {
    //set inital state for refresh  
    box.checked = false;
    //listener for each box in boxes array
    box.addEventListener('click', handler);
}

// SELECT ALL
function checkEverything() {
  // condition
  let allChecked = true;

  //inspect elements
  for (let box of boxes) {
    if (box.checked == false) {
      //then condition is false
      allChecked = false;
    }
  } 
  // set elements based on condition
  if (allChecked) {
    for (let box of boxes) {
      box.checked = false;
    }
  } else {
      for (let box of boxes) {
      box.checked = true;
    }
  }
}
selectAll.addEventListener('click', checkEverything);

//DELETE BUTTON
function deleteMe() {
  //if any are checked, loop through them and remove the checked divs.
  for (let i = (boxes.length - 1); i >= 0; i--) {
    //if box checked is true
    if (boxes[i].checked) {
      boxes[i].remove();
      boxes.splice(i, 1);
      emailDivs[i].remove();
      emailDivs.splice(i, 1);
    }
  }
  noMoreEmails();
}
deleteButton.addEventListener('click', deleteMe);


// CREATE MESSAGE WHEN ALL EMAILS ARE DELETED
function noMoreEmails() {
  if (boxes.length == 0) {
    lastMsg = document.createElement('div');
    mainContainer.appendChild(lastMsg);
    lastMsg.classList.add('endComment');  
    lastMsg.innerHTML = 'There are no more messages in your Inbox!';
    deleteButton.removeEventListener('click', deleteMe);
  }
}

