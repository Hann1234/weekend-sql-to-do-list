$(document).ready(onReady);
console.log('JS');
// let bootstrapButton = $.fn.deleteButton.noConflict(); //trying to get delete button to use bootstrap
// $.fn.deleteButton = bootstrapButton;

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
                    <div class="row" class="no">
                        <div class="col">${task.task}</div>
                        <div class="col">${task.notes}</div>
                        <div class="col">${task.completed}</div>
                        <div class="col">
                            <button type="button" class="btn btn-success id="completeButton" data-id="${task.id}">Complete</button>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-danger" id="deleteButton" data-id="${task.id}" data-name="${task.name}">Delete</button>
                        </div>
                    </div>
                `)
            }else if(`${task.completed}` == `Y`){
                $('#viewTasks').append(`
                    <div class="row" class="yes">
                        <div class="col">${task.task}</div>
                        <div class="col">${task.notes}</div>
                        <div class="col">${task.completed}</div>
                        <div class="col">Completed!</div>
                        <div class="col">
                            <button type="button" class="btn btn-danger" id="deleteButton" data-id="${task.id}" data-name="${task.name}">Delete</button>
                        </div>
                    </div>
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
        title: 'Unable to add task.',
        text: 'Please add a task name.',
        icon: 'error'
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
      clearInputs();
      getList();
    })
  }

  //PUT - UPDATE when task completed button is clicked

  function taskCompletedHandler() {
      taskCompleted($(this).data('id'));
      console.log('click on complete works');
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

  //DELETE TASK:

  function deleteTaskHandler() {
    deleteTask($(this).data('id'));
  }

  function deleteTask(taskId) {
      //SweetAlert to confirm delete
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your task has been deleted.',
            'success'
          );

          $.ajax({
            method: 'DELETE',
            url: `/tasks/${taskId}`
          })
          .then(response => {
            console.log('task deleted');
            getList(); // displays updated table list without deleted task
          })
          .catch((error) => {
            alert(`There was a problem deleting the task. Please try again.`);
          });
        }
          else {
            return;
          }
      });
  }


  function onReady() { //runs when page loads and sets up listeners for clicks
    console.log('JQ');
    clearInputs();
    getList(); //GETs tasks from database

    //click listeners go here
    $('#addButton').on('click', addTask);
    $('div').on('click', '#completeButton', taskCompletedHandler);
    $('#viewTasks').on('click','#deleteButton', deleteTaskHandler);

  };
  

