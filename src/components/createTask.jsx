import { useContext, useState } from "react";
// import taskList from "../tasksList";
import { TaskContext } from "../utils/taskList";

const CreateTask = () => {
  const { taskList, addtask, updateTask, removeTask } = useContext(TaskContext);

  const [error, setError] = useState("");

  const handleFormSubmission = (event) => {
    event.preventDefault();
    const name = event.target.taskName.value;
    const des = event.target.taskDes.value;
    if (!name) {
      setError("Task Name Needed !");
    } else {
      setError("");
      addtask(event.target.taskName.value, event.target.taskDes.value);
      event.target.taskName.value = "";
      event.target.taskDes.value = "";
    }
  };
  console.log(taskList);
  return (
    <>
      <div className="inputContainer">
        <h1>To-Do List App</h1>
        <form className="createTaskForm" onSubmit={handleFormSubmission}>
          <div className="groupForm">
            <label htmlFor="taskName">Name:</label>
            <input
              type="text"
              placeholder="Required"
              name="taskName"
              id="taskName"
            ></input>
          </div>
          <div className="groupForm">
            <label htmlFor="taskDes"> Description:</label>
            <textarea
              placeholder="Optional"
              name="taskDes"
              id="taskDes"
            ></textarea>
          </div>
          {error && <p className="valError">{error}</p>}
          <button type="submit">Add Task</button>
        </form>
      </div>
    </>
  );
};

export default CreateTask;
