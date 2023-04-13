

let tasks = [
    {
        id: 1,
        text: "Buy book",
        isImportant: false,
        isDone: false,

    }
]

let todoList = document.querySelector('.todo__list')
let todoForm = document.querySelector('.todo__form')
let todoField = document.querySelector('.todo__field')
let todoError = document.querySelector('.todo__error')


const addItemTodoList = () => {
    todoList.innerHTML = ''
    tasks.forEach((item) => {
        todoList.innerHTML += `<li class="todo__item">
                <p class="todo__item-text">${item.text}</p>

                <span data-id="${item.id}" class="todo__item-delete">X</span>
            </li>`
    })
    let todoItemDelete = document.querySelectorAll('.todo__item-delete')
    Array.from(todoItemDelete).forEach((item) => {
        item.addEventListener('click', () => {
            tasks = tasks.filter((el) => {
                return el.id !== item.dataset.id
            })
            addItemTodoList()
        })
    })


}

addItemTodoList()

todoForm.addEventListener('submit',(event)=>{
    event.preventDefault()

    if (tasks.some(item => item.text.toUpperCase() === event.target[0].value.toUpperCase())){
        alert('Cannot be added')
    }else{
    tasks = [...tasks,{
       id: tasks.length ? tasks.at(-1).id + 1 : 1,
        text: event.target[0].value,
        isImportant: false,
        isDone: false,
    }]
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