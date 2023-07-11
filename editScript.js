(function(){
    "use strict";
    const editText=document.querySelector('.editTask');
    const editBtn=document.querySelector('#editBtn');
    const backBtn=document.querySelector('#backBtn');
    let beforeEditText;
    window.addEventListener('load',function(){
        let editTextVal=JSON.parse(sessionStorage.getItem("myTaskEditStore"));
        editText.value=editTextVal;
        beforeEditText=editText.value;
    })


    editBtn.addEventListener('click',function(e){
        const edVal=editText.value;
        console.log(edVal);
        const myTasks=JSON.parse(sessionStorage.getItem("myTaskStore"));
        console.log(myTasks);
        for(let i=0;i<myTasks.length;i++){
            if(myTasks[i].task===beforeEditText)
                myTasks[i].task=edVal;
        }
        console.log(myTasks);
        sessionStorage.clear();
        sessionStorage.setItem("myTaskStore",JSON.stringify(myTasks));
    });

})();
