const task=document.querySelector('.task');
const taskSubmit=document.querySelector('.taskSubmit');
const taskList=document.querySelector('.taskList');

let myTask=[];

function addListWrtJSON(getAllTasks){
    for(let i=0;i<getAllTasks.length;i++){     
        const li=document.createElement('li');
            const span=document.createElement('span');
            span.append(getAllTasks[i]);
            const editBtn=document.createElement('a');
            editBtn.href="/edit.html";
            editBtn.className="editBtn";
            editBtn.addEventListener('click',editTask);
            editBtn.innerText="Edit";
            const delBtn=document.createElement('a');
            delBtn.className="delBtn";
            delBtn.innerText="Delete";
            delBtn.addEventListener('click',deleteTask);
            const btns=document.createElement('div');
            btns.className="taskBtns";
            btns.append(editBtn);
            btns.append(delBtn);
            li.append(span);
            li.append(btns);
            taskList.append(li);
    }
}

window.addEventListener('load',function(){
    let getAllTasks=JSON.parse(sessionStorage.getItem("myTaskStore"));
    if(getAllTasks!==null){
        getAllTasks.forEach((eachTask)=>{
            myTask.push(eachTask);
        })
        addListWrtJSON(myTask);
    }
    else{
    sessionStorage.setItem("myTaskStore",JSON.stringify(myTask));
}
})

function addTask(taskText){    
    let getAllTasks=JSON.parse(sessionStorage.getItem("myTaskStore"));
    myTask=[];
    sessionStorage.clear();
    for(let i=0;i<getAllTasks.length;i++)
        myTask.push(getAllTasks[i]);
    myTask.push(taskText);
    sessionStorage.setItem("myTaskStore",JSON.stringify(myTask));
    // console.log(myTasks);
// console.log(typeof myObj);
    taskList.innerHTML="";
    addListWrtJSON(myTask);
    
}

function editTask(e){
    let editListItem=e.target.parentElement.parentElement.firstChild.innerText;
    sessionStorage.setItem("myTaskEditStore",JSON.stringify(editListItem));
}

function deleteTask(e){
    const delListItem=e.target.parentElement.parentElement;
    const delListItemText=delListItem.firstChild.innerText;
    console.log(delListItemText);
    console.log("Before : ",myTask);
    myTask=myTask.filter((eachTask)=>{
        return (eachTask!==delListItemText)&&(eachTask!==null);
    });
    // console.log(myTask);
    console.log("After : ",myTask);
    sessionStorage.setItem("myTaskStore",JSON.stringify(myTask));

    delListItem.remove();
    
}

taskSubmit.addEventListener('submit',function(e){
    e.preventDefault();
    const taskText=e.target.elements["task"].value;
    if(taskText!==""){
        addTask(taskText);
        task.value="";
    }
    
});

