import {useState,useEffect} from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
function App() {
  const [showAddTask, setshowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    const getTasks = async() => {
      const recTasks = await fetchTasks()
      setTasks(recTasks)

    }

    getTasks();
  }, [])

  const fetchTasks = async() => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  const fetchTask = async(id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data

  }


  const addTask = async(task) => {
    // const id = Math.floor(Math.random()*10000 +1)
    // const newTask = {id, ...task }
    // setTasks([...tasks, newTask])
    const res = await fetch('http://localhost:5000/tasks',{
      method : 'POST',
      headers : {'Content-type' : 'application/json',},
      body : JSON.stringify(task),
    })
    const data = await res.json()
    setTasks([...tasks,data])
  }

  const deleteTask = async(id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method : 'DELETE',
    })
    setTasks(tasks.filter((task)=>task.id!=id))
  }

  const reminder = async(id) => {
    const taskToggle = await fetchTask(id)
    const updatedTask = {...taskToggle, reminder : !taskToggle.reminder}
    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method : 'PUT',
      headers : {
        'content-type' : 'application/json'
      },
      body : JSON.stringify(updatedTask),
    })
    const data = await res.json()
    setTasks(tasks.map((task)=>id==task.id?{...task , reminder:data.reminder}:task))
  }

 
  return (
    
    <div className="container">
      <Header onAdd = {() => setshowAddTask(!showAddTask)} toggle = {showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      { tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle = {reminder}/> : "No Tasks to Show"}
    </div>
  );
}

export default App;
