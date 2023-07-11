(function(){
    "use strict";
    const task=document.querySelector('.task');
    const taskSubmit=document.querySelector('.taskSubmit');
    const taskList=document.querySelector('.taskList');

    let myTask=[];

    function addListWrtJSON(getAllTasks){
        for(let i=0;i<getAllTasks.length;i++){     
            const li=document.createElement('li');
            const taskDone=document.createElement('div');
            taskDone.className="taskDone";
            let inpId=Math.floor(Math.random() * Date.now()).toString(16);
            const listText=document.createElement('input');
            listText.setAttribute('id',inpId); 
            listText.setAttribute('type','checkbox');
            const label=document.createElement('label');
            label.className="listT";
            label.setAttribute('for',inpId);
            const span=document.createElement('span');
            const ins=document.createElement('ins');
            const is=document.createElement('i');
            is.innerText=getAllTasks[i].task;
            ins.append(is);
            span.addEventListener('click',handleSpans);
            label.append(span);
            label.append(getAllTasks[i].task);
            label.append(ins);
            taskDone.addEventListener('click',handleCheckBoxes);
            if(getAllTasks[i].check==="true"){
                listText.className="active";
            }
            else if(getAllTasks[i].check==="false"){
                listText.className="";
            }
            taskDone.append(listText);
            taskDone.append(label);
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
            li.append(taskDone);
            li.append(btns);
            taskList.append(li);
        }
    }
    let isClick=true;

    function handleSpans(e){
        try{
            if(isClick){
                let lText=e.target.parentElement.children[1].children[0].innerText;
                const inp=e.target.parentElement.parentElement.children[0];
                for(let i=0;i<myTask.length;i++){
                    if(lText===myTask[i].task){
                        if(myTask[i].check==="false"){
                            myTask[i].check="true";
                            inp.className="active";
                        }
                        else{
                            myTask[i].check="false"; 
                            inp.className="";
                        }
                    }
                }
                isClick=false;
                sessionStorage.setItem("myTaskStore",JSON.stringify(myTask));
                taskList.innerHTML="";
                addListWrtJSON(myTask);
            }
            else{
                isClick=true;
            }
        }
        catch(e){
            console.log("Complications Handled :)");
        }
    }


    function handleCheckBoxes(e){
        try{
            if(isClick){
                let lText=e.target.parentElement.children[1].children[1].children[0].innerText;
                const inp=e.target.parentElement.children[0];
                for(let i=0;i<myTask.length;i++){
                    if(lText===myTask[i].task){
                        if(myTask[i].check==="false"){
                            myTask[i].check="true";
                            inp.className="active";
                        }
                        else{
                            myTask[i].check="false"; 
                            inp.className="";
                        }
                    }
                }
                isClick=false;
                sessionStorage.setItem("myTaskStore",JSON.stringify(myTask));
                taskList.innerHTML="";
                addListWrtJSON(myTask);
            }
            else{
                isClick=true;
            }
        }
        catch(e){
            console.log("Complications Handled :)");
        }
    }


    window.addEventListener('load',function(){
        let getAllTasks=JSON.parse(sessionStorage.getItem("myTaskStore"));
        isClick=true;
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
        for(let i=0;i<getAllTasks.length;i++)
            myTask.push(getAllTasks[i]);
        myTask.push({task:taskText,check:"false"});
        sessionStorage.setItem("myTaskStore",JSON.stringify(myTask));
        taskList.innerHTML="";
        addListWrtJSON(myTask);
    }

    function editTask(e){
        let editListItem=e.target.parentElement.parentElement.children[0].children[1].children[1].children[0].innerText;
        sessionStorage.setItem("myTaskEditStore",JSON.stringify(editListItem));
    }

    function deleteTask(e){
        const delListItem=e.target.parentElement.parentElement;
        const delListItemText=delListItem.children[0].children[1].children[1].children[0].innerText;
        myTask=myTask.filter((eachTask)=>{
            return (eachTask.task!==delListItemText)&&(eachTask!==null);
        });
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
})();

