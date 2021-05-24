import TodoList from './components/TodoList'
import { useState, useRef, useEffect } from 'react'
import './App.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {       //makes todos stay even after reload page
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) //parse this string to an array
    if (storedTodos) setTodos(storedTodos)   //if there are todos in memory, display them on reload
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos)) //ensure todos saved as strings
  }, [todos])   //any time todos changes, we save them

  function toggleTodo(id) {
    const newTodos = [...todos]  //creating  a copy of todos before modifying it
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value   //get value entered
    if (name === '') return 
    setTodos(prevTodos => {return [...prevTodos, {id:Math.random(0,1000), name:name, complete: false}]})
    todoNameRef.current.value = null   //clear after entering  a name
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add</button>
      <button onClick={handleClearTodos}>Clear</button>
      <div>{todos.filter(todo => !todo.complete).length} tasks left to-do</div>
    </>
  )
}
export default App;
