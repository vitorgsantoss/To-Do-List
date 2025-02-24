const button = document.querySelector('.btn-task')
const input = document.querySelector('.input-task')
const ul = document.querySelector('.list-tasks')

let toDoList = []

function addTask(){
    if (input.value){
        toDoList.push({
            taskName: input.value,
            completed: false
        })
        showTasks()
    }else{
        alert('Não é possível salvar uma tarefa vazia!')
    }
}

function showTasks(){
    let newLi = ''

    toDoList.forEach((task, index)=>{
        newLi += `

        <li class="task ${task.completed?'done':'notdone'}">
            <img src="img/checked.png" alt="check-na-tarefa" onclick="completeTask(${index})">
            <p>${task.taskName}</p>
            <img src="img/trash.png" alt="remover-tarefa" onclick="removeTask(${index})">
        </li>

        `
    })

    ul.innerHTML = newLi

    localStorage.setItem('toDoList', JSON.stringify(toDoList))
}

function removeTask(index){
    toDoList.splice(index, 1)
    showTasks()
}

function completeTask(index){
    toDoList[index].completed = !toDoList[index].completed
    showTasks()
}

function reloadTasks(){
    const localStorageTasks = localStorage.getItem('toDoList')
    if (localStorageTasks){
        toDoList = JSON.parse(localStorageTasks)
    }
    showTasks()
}

function changeButtonContent(){
    const buttonAdd = document.querySelector('button.btn-task')
    if (window.innerWidth < 700){
        buttonAdd.innerText = 'Add'
    }else{
        buttonAdd.innerText = 'Adicionar'
    }
}

reloadTasks()

window.addEventListener('resize', changeButtonContent)
window.addEventListener('load', changeButtonContent)
button.addEventListener('click', addTask)