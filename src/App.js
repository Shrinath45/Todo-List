import React, { useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", endDate: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [view, setView] = useState("home");
  


  const handleAddTask = () => {
    if (!newTask.title.trim() || !newTask.description.trim() || !newTask.endDate) return;
    setTasks([...tasks, { id: Date.now(), ...newTask, completed: false }]);
    setNewTask({ title: "", description: "", endDate: "" });
    setView("tasks");
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setNewTask({ title: task.title, description: task.description, endDate: task.endDate });
    setView("add");
  };

  const handleUpdateTask = () => {
    if (!newTask.title.trim() || !newTask.description.trim() || !newTask.endDate) return;
    setTasks(
      tasks.map((task) =>
        task.id === currentTask.id ? { ...task, ...newTask } : task
      )
    );
    setNewTask({ title: "", description: "", endDate: "" });
    setIsEditing(false);
    setCurrentTask(null);
    setView("tasks");
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="container-fluid">

<nav class="navbar navbar-expand-lg text-light d-flex flex-wrap bg-primary">
			<div class="container-fluid">
				<h1 class="title navbar-brand fs-1  text-success fw-bold">ToDo<span class="lab text-black">App</span></h1>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav ms-auto ul p-lg-3">
						<li class="nav-item me-2">
            <button
                className="btn btn-link nav-link fw-bold"
                onClick={() => setView("home")}
              >
                Home
              </button>
						</li>
						<li class="nav-item me-2" >
            <button
                className="btn btn-link nav-link fw-bold"
                onClick={() => {
                  setNewTask({ title: "", description: "", endDate: "" });
                  setIsEditing(false);
                  setView("add");
                }}
              >
                Add Task
              </button>
						</li>

						<li class="nav-item me-2">
            <button
                className="btn btn-link nav-link fw-bold"
                onClick={() => setView("tasks")}
              >
                View Task
              </button>
						</li>
            
					</ul>
				</div>
				
			</div>
		</nav>

      {/* Views */}
      {view === "home" && (
        <div className="mt-5">
          <h4>Welcome to the Todo App</h4>
        </div>
      )}

      {view === "add" && (
        <div className="card p-4 shadow-sm mt-5 w-50 text-center">
          <h4 className="mb-4">{isEditing ? "Edit Task" : "Add New Task"}</h4>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="form-control mb-2"
            />
            <textarea
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="form-control mb-2"
            ></textarea>
            <input
              type="date"
              value={newTask.endDate}
              min={today}
              onChange={(e) => setNewTask({ ...newTask, endDate: e.target.value })}
              className="form-control mb-3"
            />
            <button
              onClick={isEditing ? handleUpdateTask : handleAddTask}
              className="btn btn-primary w-100"
            >
              {isEditing ? "Update Task" : "Add Task"}
            </button>
          </div>
        </div>
      )}

      {view === "tasks" && (
        <table className="table table-bordered mt-5">
          <thead className="thead-dark">
            <tr className="text-center">
              <th>Title</th>
              <th>Description</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody style={{alignItems:"center", textAlign:"center"}}>
            {tasks.map((task) => (
              <tr key={task.id} className={task.completed ? "table-success" : ""}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.endDate}</td>
                <td>{task.completed ? "Completed" : "Pending"}</td>
                <td>
                  {!task.completed && (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2 bi bi-check-square-fill text-black"
                        onClick={() => handleToggleComplete(task.id)}
                      >
                        
                      </button>
                      <button
                        className="btn btn-warning btn-sm me-2 bi bi-pen-fill text-black"
                        onClick={() => handleEditTask(task)}
                      >
                      
                      </button>
                      <button
                        className="btn btn-danger btn-sm bi bi-trash-fill text-black"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                      
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TodoApp;