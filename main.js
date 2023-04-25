

let tasks = []

let todoList = document.querySelector('.todo__list')
let todoForm = document.querySelector('.todo__form')
let todoField = document.querySelector('.todo__field')
let todoError = document.querySelector('.todo__error')
let todoName = document.querySelector('.todo__greetings-name')
let todoText = document.querySelector('.todo__item-text')

if (localStorage.getItem('tasks') !== null){
    tasks = JSON.parse(localStorage.getItem('tasks'))
}


console.log(tasks)


const saveLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

if (localStorage.getItem('todoName') !== null){
    todoName.value = localStorage.getItem('todoName')
}



todoName.addEventListener('input', (e) => {
    localStorage.setItem('todoName', e.target.value)
})





const addItemTodoList = () => {
    todoList.innerHTML = ''
    tasks.forEach((item) => {
        todoList.innerHTML += `<li class="todo__item" style="order: ${item.isDone ? '-1' : '0'}">

    <div class="todo__item-left">
    <input data-id="${item.id}" ${item.isDone ? 'checked' : ''} class="todo__item-done" type="checkbox">
    
    ${
            item.changeNow ? `<input type="text" value="${item.text}">` : ` <p class="todo__item-text" style="text-decoration: ${item.isDone ? 'line-through' : ''}">${item.text}</p>`
        }
</div>
               <div class="todo__item-interact">
               <span data-id="${item.id}" class="todo__item-edit">${item.changeNow ? 'Save' : 'Edit'}</span>
                <span data-id="${item.id}" class="todo__item-delete">Delete</span>
                </div>
            </li>`
        saveLocalStorage()
    })

    let todoItemChange = document.querySelectorAll('.todo__item-edit')
    Array.from(todoItemChange).forEach((item) => {


        item.addEventListener('click', () => {
            console.log(item)
            if (item.textContent === 'Edit') {

                tasks = tasks.map((el) => {
                    if (el.id === +item.dataset.id ) {
                        return {...el, changeNow: !el.changeNow}
                    }else{
                        return el
                    }
                })
            } else {
                console.log('edit2')
                tasks = tasks.map((el) => {
                    if (el.id === +item.dataset.id ) {
                        return {...el, changeNow: !el.changeNow, text: item.parentElement.previousElementSibling.children[1].value}
                    }else{
                        return el
                    }
                })
            }


            saveLocalStorage()
            addItemTodoList()

        })
    })


    let todoItemDelete = document.querySelectorAll('.todo__item-delete')
    Array.from(todoItemDelete).forEach((item) => {
        item.addEventListener('click', () => {
            tasks = tasks.filter((el) => {
                return el.id !== +item.dataset.id
            })
            saveLocalStorage()
            addItemTodoList()

        })
    })
    


    let todoItemDone = document.querySelectorAll('.todo__item-done')

    Array.from(todoItemDone).forEach((item) => {
        item.addEventListener('change', () => {
            tasks = tasks.map((el) => {
                if (el.id === +item.dataset.id ) {
                    return {...el, isDone: !el.isDone}
                }else{
                    return el
                }
            })
            saveLocalStorage()
            addItemTodoList()

        })
    })

}

addItemTodoList()




todoForm.addEventListener('submit',(event)=>{
    event.preventDefault()

    if (tasks.some(item => item.text.toUpperCase() === event.target[0].value.toUpperCase()) || event.target[0].value.trim().length < 1){
        alert('Cannot be added')
    }else{
    tasks = [...tasks,{
       id: tasks.length ? tasks.at(-1).id + 1 : 1,
        text: event.target[0].value,
        isImportant: false,
        isDone: false,
        changeNow: false
    }]
        saveLocalStorage()
    addItemTodoList()

    event.target[0].value = ''
    }
})

todoField.addEventListener('input', (event) => {
    if (tasks.some(item => item.text.toUpperCase() === event.target.value.toUpperCase())) {
        todoError.style.display = 'block'
    }else{
        todoError.style.display = 'none'
    }
})




