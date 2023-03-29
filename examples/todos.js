//states of the app or application
const todos = ['first item', 'second item', 'third item']

//HTML references
const addTodoInput = document.getElementById('todo-input')
const addTodoButton = document.getElementById('add-todo-btn')
const todosList = document.getElementById('todos-list')

//Add Event Listeners to static part
addTodoInput.addEventListener('input', ()=>{
    addTodoButton.disabled = addTodoInput.value.length < 3
})

addTodoInput.addEventListener('keydown', ({key})=>{
    if(key == 'Enter'){
        addTodo();
    }
})

addTodoButton.addEventListener('click', ()=>{
    addTodo()
})


//Initialize the view
for(const todo of todos){
    todosList.append(renderTodoInReadMode(todo));
}

// these two functions return li element which we can appned into ul element.
function renderTodoInReadMode(todo){
    // return
    // <li>
    //     <span>todo text content</span>
    //     <button>Done</button>
    // </li>


    //create <li></li> element
    const li = document.createElement('li');

    //create <span></span> element
    const span = document.createElement('span');
    span.textContent = todo;
    span.addEventListener('dblclick', ()=>{
        const id = todos.indexOf(todo)
        todosList.replaceChild(renderTodoInEditMode(todo), todosList.childNodes[id])
    });
    li.append(span);

    //create <button></button>
    const button = document.createElement('button');
    button.textContent = 'Done';
    button.addEventListener('click', ()=>{
        const idx = todos.indexOf(todo)
        removeTodo(idx)
    });
    li.append(button);

    return li;
}

function renderTodoInEditMode(todo){
    //Todo: implement me
    const li = document.createElement('li');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = todo;
    li.append(input);

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.addEventListener('click', ()=>{
        const id = todos.indexOf(todo);
        updateTodo(id, input.value);
    })
    li.append(saveBtn)

    const cancelBtn = document.createElement('button')
    cancelBtn.textContent = 'Cancel'
    cancelBtn.addEventListener('click',()=>{
        const id = todos.indexOf(todo);
        todosList.replaceChild(
            renderTodoInReadMode(todo),
            todosList.childNodes[id]
        )
    })
    li.append(cancelBtn);

    return li
}

//here we are adding, updating and removing in todos and todosList
//To add, update, remove from todos is very simple.
//To add, update, remove from todoList, we have two function renderTodoInReadMode and renderTodoInEditMode
function addTodo(){
    const description = addTodoInput.value
    todos.push(description);

    const todo = renderTodoInReadMode(description);

    todosList.append(todo);

    addTodoInput.value = '';
    addTodoButton.disabled = true
}

function removeTodo(index){
    todos.splice(index, 1);
    todosList.childNodes[index].remove()
}

function updateTodo(index, description){
    todos[index] = description;
    const todo = renderTodoInReadMode(description);
    todosList.replaceChild(todo, todosList.childNodes[index])
}


