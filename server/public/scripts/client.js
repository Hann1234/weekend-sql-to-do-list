$(document).ready(onReady);
console.log('JS');

function clearInputs(){ //clears inputs
    $('#nameIn').val('');
    $('#notesIn').val('');
  }

function getList() { //makes an ajax call to server to get the list
    console.log('in getList');
    $('#viewTasks').empty();
    $.ajax({
        type: 'GET',
        url: '/tasks',
      }).then(function (response){
        console.log('in getList', response);
        //append the DOM to include list data
        for (const task of response) {
            if(`${task.completed}` == `N`){
                $('#viewTasks').append(`
                    <tr class="no">
                        <td>${task.name}</td>
                        <td>${task.notes}</td>
                        <td>${task.completed}</td>
                        <td>
                            <button id="completeButton" data-id="${task.id}">Complete</button>
                        </td>
                        <td>
                            <button id="deleteButton" data-id="${task.id}" data-name="${task.name}">Delete</button>
                        </td>
                    </tr>
                `)
            }else if(`${task.completed}` == `Y`){
                $('#viewTasks').append(`
                    <tr class="yes">
                        <td>${task.name}</td>
                        <td>${task.notes}</td>
                        <td>${task.completed}</td>
                        <td>Completed!</td>
                        <td>
                             <button id="deleteButton" data-id="${task.id}" data-name="${task.name}">Delete</button>
                        </td>
                    </tr>
                `)
            }
        }
      }).catch(error => {
      console.log('Error rendering Koala info to DOM', error);
      })
}

  function onReady() { //runs when page loads and sets up listeners for clicks
    console.log('JQ');
    clearInputs();

    //click listener for adding task goes here

    getList();

    
  }
  

