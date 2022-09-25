import React, { useEffect, useState } from "react";
import "./todoform.scss";
import TodoLIst from "./TodoLIst";
function Todofrom() {

//--------------START SET STATE--------------//

  // state for value input
  const [input, setinput] = useState("");

  // state for array tasks
  const [tasks, settasks] = useState([]);

  // state for id for editing
  const [editid, seteditid] = useState(0);

//--------------START SET STATE--------------//


//--------------START FUNCTION--------------//
  
  // ----------call function for get tasks in local storge after reload the page--------
  useEffect(() => {
    GetInLS();
  }, []);

  // ---------- function for add task in state and call function for add in local storage --------
  const addTask = (e) => {
    e.preventDefault();

    // if editing !== 0 entre for edeting else add task
    if (editid) {
      const newTask = tasks.map((task)=>{
        if (task.id === editid) {
          task.task = input
        }
        return task
      })

      //add in local storage and add in state for array task
      AddINLS(newTask);
      settasks(newTask)

      // set 0 in state id for not entre in editing and empty value of input
      seteditid(0)
      setinput("")
      return;

    }else if (input === "") {
      console.log("input is emplty");
    } else {

      // add in local storge
      AddINLS([...tasks, { id: Date.now(), task: input, complete: false }]);
      // add task in state for tasks
      settasks([...tasks, { id: Date.now(), task: input, complete: false }]);
      setinput("");
    }
  };


  // -------------- function add in local storge --------------
  const AddINLS = (tasks) => {
    localStorage.setItem("task", JSON.stringify(tasks));
  };

  // -------------- get in local storge --------------
  const GetInLS = () => {
    let data = localStorage.getItem("task");
    data && settasks(JSON.parse(data));
  };

  //  -------------- function for delet in local storage and task --------------
  const DeletInLS = (e, index) => {

    // set new var for stocke retur the array after filter
    const newTasks = tasks.filter((task) => {
      return task.id !== index;
    });

    // add new array in local storage and in state of tasks array
    AddINLS(newTasks);
    settasks(newTasks);
  };

  // -------------- function set task Complete --------------
  const SetComplet = (index) => {
    // set true in completed
    const neww = tasks.map((task) => {
      if (task.id === index) {
        task.complete = !task.complete;
      }
      return task
    });
    // add in local storage
    AddINLS(neww);
    settasks(neww);
  };
  
  // -------------- function for add id n state id and add task title in input --------------
  const EditTask = (index)=>{
    const taskedit = tasks.find((task)=> task.id === index)
    setinput(taskedit.task)
    seteditid(index)
  }

//--------------END FUNCTION--------------//

//--------------Start JSX --------------
  return (
    <>
      <header className="container col-10 col-sm-8 col-md-7 col-lg-6 mx-auto">

        <h1 className="text-center mb-4">todo <span>list</span></h1>

        <form className="row d-flex justify-content-around">

          <input
            onChange={(e) => {
              setinput(e.target.value);
            }}
            type="text"
            className="col-8"
            value={input}
          />

          <button onClick={addTask} className="btn col-3">
            {editid ? "Edit" : "Add"}
          </button>

        </form>

      </header>

      {/* Start Div For All Tasks */}
      <div className="tasks">
        <TodoLIst EditTask={EditTask} input={input} setinput={setinput} SetComplet={SetComplet} funcdelet={DeletInLS} tasks={tasks} />
      </div>
      {/* Start Div For All Tasks */}
      
    </>
  );
}
//--------------END JSX --------------

export default Todofrom;
