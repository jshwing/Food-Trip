const inputBox = document.querySelector(".searchArea input");
const addBtn = document.querySelector(".searchArea button");
const planlist = document.querySelector(".planlist");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
    let userData = inputBox.value;
    if(userData.trim() != 0){
        addBtn.classList.add("active");
    }else{
        addBtn.classList.remove("active");
    }
}

addBtn.onclick = ()=>{
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New plan");
    if(getLocalStorage == null){
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem("New plan", JSON.stringify(listArr));
    showTasks();
}

function showTasks(){
    let getLocalStorage = localStorage.getItem("New plan");
    if(getLocalStorage == null){
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length;
    if(listArr.length > 0){
        deleteAllBtn.classList.add("active");
    }else{
        deleteAllBtn.classList.remove("active");
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li>${element} <span onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
    });
    planlist.innerHTML = newLiTag;
    inputBox.value = "";
}

function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New plan");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    localStorage.setItem("New plan", JSON.stringify(listArr));
    showTasks();
}

deleteAllBtn.onclick = ()=>{
    listArr = [];
    localStorage.setItem("New plan",JSON.stringify(listArr));
    showTasks();
}