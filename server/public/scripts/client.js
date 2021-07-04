$(document).ready(onReady);
console.log('JS');

function clearInputs(){ //clears inputs
    $('#nameIn').val('');
    $('#notesIn').val('');
  }

  function onReady() { //runs when page loads and sets up listeners for clicks
    console.log('JQ');
    clearInputs();
 
  }
  

