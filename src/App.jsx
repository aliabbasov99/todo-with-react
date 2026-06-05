import "./assets/style.css"
import { useState } from "react"

let currentId = 0;
function App() {
  const [todos, setTodos] = useState([]);
  const [inputAreaValue, setInputAreaValue] = useState("");

  function addTodo(e){
    e.preventDefault()
    const newTodo = {task: inputAreaValue, id: currentId++, editing: false}
    
    setTodos([...todos, newTodo])
    setInputAreaValue('')
  }
  function deleteTodo(todoId){
    const index = todos.findIndex(t=> t.id===todoId)
    setTodos(
      [
        ...todos.slice(0, index),
        ...todos.slice(index+1)
      ]
    )
  }
  function switchEditStateTodo(todoId){
    const index = todos.findIndex(t=> t.id===todoId)
    let currentTodo = todos.find(t=> t.id===todoId)
    currentTodo.editing = true
    setTodos(
      [
        ...todos.slice(0, index),
          currentTodo,
        ...todos.slice(index+1)
      ]
    )
    
  }
  function editTodo(e, todoId){
      const index = todos.findIndex(t=> t.id===todoId)
    let currentTodo = todos.find(t=> t.id===todoId)
    currentTodo.task = e.target.value
    setTodos(
      [
        ...todos.slice(0, index),
          currentTodo,
        ...todos.slice(index+1)
      ]
    )
    }
    function changeTodoTask(todoId){
const index = todos.findIndex(t=> t.id===todoId)
    let currentTodo = todos.find(t=> t.id===todoId)
    currentTodo.editing = false
    setTodos(
      [
        ...todos.slice(0, index),
          currentTodo,
        ...todos.slice(index+1)
      ]
    )
    }
  return (
    <div className="container mx-auto px-4 md:px-40">
      <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Todo List</h1>
          <form className="flex gap-4 flex-row">
          <input onSubmit={e=>addTodo(e)} onChange={(e)=> setInputAreaValue(e.target.value)} value={inputAreaValue} id="addTodoInputArea" className="outline-2 rounded-full px-2 w-60"></input>
          <button onClick={e=>addTodo(e)} className="rounded-full bg-green-600 text-white w-20 p-2 hover:bg-green-800">Əlavə et</button>

          </form>
          <ul>
          {todos.map(todo=>{
            return(
            <li key={todo.id} className="flex mt-4 gap-2 flex-row" >
              
              <label form="taskcheck" className="py-2 flex items-center">
              <input name="taskcheck" type="checkbox" className="mr-2" ></input>
              
              
              {!todo.editing ? todo.task : <input onChange={(e)=>editTodo(e,todo.id)} value={todo.task} className="outline-2 rounded-full px-2 w-60"></input>}
            
              </label>

              {!todo.editing ? <button onClick={()=>switchEditStateTodo(todo.id)} className="rounded-full outline-2 bg-yellow-300 text-white p-2 hover:bg-yellow-600">Dəyişdir</button> : <button onClick={()=>changeTodoTask(todo.id)} className="rounded-full outline-2 bg-yellow-300 text-white p-2 hover:bg-yellow-600">Göndər</button> }  
              
              <button onClick={()=>{deleteTodo(todo.id)}} className="rounded-full bg-red-600 text-white p-2 px-5 hover:bg-red-800">Sil</button>
            </li>
            )
            
          })}
            
          </ul>
      </div>
      
    </div>
  )
}

export default App
