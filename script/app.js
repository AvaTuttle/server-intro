function saveTask(){
    //console.log("save task fn");
        //get values
    const title = $("#txtTitle").val();
    const desc = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();

    let taskToSave = new Task (title, desc, color, date, status, budget)
    console.log("task to save")  
    
    displayTask(taskToSave);

//save to server (POST)

$.ajax({
    type: "POST",
    url: "http://fsdiapi.azurewebsites.net/api/tasks/",
    data: JSON.stringify(taskToSave),
    contentType:"application/json",
    success: function(response){
    console.log(response);
    },
    error: function(error)
    {
    console.log(error);
    }
})

//dispaly the task (GET)

}

function loadTask() {
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net/api/tasks",
        success: function(response){
            console.log(response);
            let data = JSON.parse(response); //converts from JSON to objects
                console.log(data);
                //create teh logic to render only the messages that match with youre name
            for(let i=0;i<data.length;i++)
            {
                let task = data[i];
                if(task.name =="Ava")
                {
                    console.log(task);
                    displayTask(task);
                }
            }
        },
        error: function(error){
            console.log(error);
        }
    });
}


function displayTask(taskToSave){
    let syntax = `
    <div class="task-container" style="border-color:${taskToSave.color}">
        <div class="task">
            <div class="info">
                <h5>${taskToSave.title}</h5>
                <p>${taskToSave.description}</p>
            </div>

            <div class="status">${taskToSave.status}</div>

            <div class="date-budget">
                <span>${taskToSave.date}</span>
                <span>${taskToSave.budget}</span>
            </div>
        </div>
    </div>
    `
    $("#list").append(syntax)
}

function testRequest(){
    $.ajax({
        type: "GET",
        URL:"http://fsdiapi.azurewebsites.net",
        sucess: function(response){
            console.log(response);
        },
        Error: function(error){
            console.log(error);
        }
        
    })
}

function init(){
    console.log("init");
    $("#btnSave").click(saveTask);
    loadTask();
    displayTask(task);

}

window.onload=init;