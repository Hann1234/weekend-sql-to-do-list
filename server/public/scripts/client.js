$(document).ready(onReady);
console.log('JS');

function clearInputs(){ //clears inputs
    $('#taskIn').val('');
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
                        <td>${task.task}</td>
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
                        <td>${task.task}</td>
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
      console.log('Error appending tasks into DOM', error);
      })
}

function addTask() { //adds a task to database when add task button is clicked
    console.log( 'in addButton on click' );
    // validate inputs
    if (!$('#taskIn').val()) {
      Swal.fire({
        'Unable to add task.',
        'Please add a task name.',
        'error'
      })
        return;
    }

    // get user input and put in an object

    let newTask = {
        task: $('#taskIn').val(),
        notes: $('#notesIn').val(),
        completed: 'N',
      };

      saveTask(newTask);
}

function saveTask(newTask) {
    console.log('in saveTask', newTask);
    // ajax call to server to POST tasks
    $.ajax({
      type: 'POST',
      url: '/tasks',
      data: newTask,
    }).then( (response) => {
      clearInput();
      getList();
    })
  }

  //PUT - UPDATE when task completed button is clicked

  function taskCompletedHandler() {
      taskCompleted($(this).data('id'));
  }

  function taskCompleted (taskId) {
    $.ajax({
      method: 'PUT',
      url: `/tasks/${taskId}`
    })
    .then ((response)=>{
      console.log('Task update:', response);
      getList(); // updates DOM
    })
    .catch (error =>{
      alert('Something went wrong', error);
    });
  }


  function onReady() { //runs when page loads and sets up listeners for clicks
    console.log('JQ');
    clearInputs();
    getList(); //GETs tasks from database

    //click listeners go here
    $('#addButton').on('click', addTask);
    $('table').on("click", '#completeButton', taskCompletedHandler);

    
    
  }
  

