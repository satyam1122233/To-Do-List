import { useState,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import { v4 as uuidv4 } from 'uuid';


function App() {

  const[todo, setTodo]=useState("");
  const[todos, setTodos]=useState([]);
  const[editTodoId, setEditTodoId]=useState("");
  const[showFinished, setShowFinished]=useState(false);



  //localStorage
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('items', JSON.stringify(todos));
    }
  }, [todos]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    if (items) {
     setTodos(items);
    }
  }, []);

  //end local storage part


  const ToggleShowTodos=()=>{
         setShowFinished(!showFinished)
  }

  const handleEdit=(id)=>{

    const t=todos.filter((e)=>{
      return e.id===id;
    })
    setTodo(t[0].todo);
    setEditTodoId(id)
  }

  
  const handleSaveEditTodo=()=>{

    setTodos(todos.map((item)=>{
     return item.id===editTodoId?{...item,todo}:item
    }
    ));
    setEditTodoId("");
    setTodo("");
  
  };



  const handleDelete=(id)=>{

    const newArray=todos.filter((e)=>{

      return e.id!==id;
    });

    setTodos(newArray);
  }

  const handleAdd=()=>{
    if(todo.trim()){

      setTodo("");
      setTodos([...todos,{id:uuidv4(), todo, isCompleted: false}])
      console.log(todos)
    }
  }

  const handleChange=(e)=>{
      setTodo(e.target.value)
  }

  const handleCheckBox = (id) => {
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };
  
  return (
    <>
    <NavBar/>
    <div className="todoContainer  bg-sky-200  my-5 mx-6 rounded-xl p-5 h-[88vh] shadow-md
      shadow-red-400 flex ">
      <div className="container flex-1 overflow-hidden" >

        <div className="addToDo flex flex-col shadow-md rounded-md shadow-black p-2 mr-4">
          <h2 className='text-lg font-bold bg-sky-300 p-2 rounded-md text-center'>
        Add a Todo
          </h2>

     <div className="addTodoInput w-full flex flex-col sm:flex-row gap-2 my-3">

          <input className='rounded-md px-2 text-md  flex-col flex-1 w-full sm:w-full' onChange={handleChange} value={todo} type='text'/>
          <button onClick={editTodoId?handleSaveEditTodo : handleAdd} className='bg-green-600 hover:bg-green-700 p-3  py-1 rounded-md text-white mx-4 w-fit h-fit flex-col  flex-2'>{editTodoId?"Save":"Add"}</button>
          </div>
          </div>
         

<div className="todos my-4  shadow-black shadow-md p-2  mr-4 h-3/4">

<div className="showListCheckBox justify-center mt-2 mb-4">
<input className='' onChange={ToggleShowTodos} type='checkbox' /> Show All List
</div>

<h2 className='text-lg font-bold shadow-sm bg-sky-300 shadow-black p-2 text-center '>Your List</h2>
{todos.length===0 && <div>No Data To Display</div>}
<div className="todoListsContainer h-[46vh] overflow-y-scroll no-scrollbar rounded-md " >
{todos.map(item=>{

    return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex gap-4 my-4 p-1  justify-between shadow-md shadow-black rounded-md text-md mx-1">
<div className="todoContents flex ">
      <input className='' onChange={()=>handleCheckBox(item.id)} type='checkbox'  checked={item.isCompleted}/>

         <div className={`${item.isCompleted ? "line-through" : ""} break-all  ml-2`} >{item.todo}</div>
         
         </div>
         <div className="buttons flex flex-col gap-2 text-sm w-fit my-auto h-fit sm:flex-row sm:w-fit">
  <button
    onClick={() => handleEdit(item.id)}
    className="bg-green-600 hover:bg-green-700 p-3 py-1 rounded-md text-white my-auto">
    Edit
  </button>
  <button
    onClick={() => handleDelete(item.id)}
    className="bg-green-600 hover:bg-green-700 p-3 py-1 rounded-md text-white my-auto">
    Delete
  </button>
</div>


     </div>
     })}
</div>
</div>
          

      </div>

      <div className="todoImageContainer flex-1 overflow-hidden  shadow-black shadow-md sm:block hidden">
      <img  src="https://media.giphy.com/media/dQpUkK59l5Imxsh8jN/giphy.gif" alt="" className="w-full h-full rounded-lg sm:block hidden" />
      </div>

      </div>
     
    </>
  )
}

export default App
