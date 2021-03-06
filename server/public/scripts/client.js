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
      getList();      
      clearInputs();
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
    $('table').on("click", '#completeButton', taskCompletedHandler);
    $('#viewTasks').on('click','#deleteButton', deleteTaskHandler);

  };
  

