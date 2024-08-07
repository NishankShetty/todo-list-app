import { useContext } from "react";
// import taskList from "../tasksList";
import { TaskContext } from "../utils/taskList";

const CreateTask = () => {
  const { taskList, addtask, updateTask, removeTask } = useContext(TaskContext);

  const handleFormSubmission = (event) => {
    event.preventDefault();
    addtask(event.target.taskName.value, event.target.taskDes.value);
    event.target.taskName.value = "";
    event.target.taskDes.value = "";
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
              placeholder="Enter Task Name"
              name="taskName"
              id="taskName"
            ></input>
          </div>
          <div className="groupForm">
            <label htmlFor="taskDes"> Description:</label>
            <textarea
              placeholder="Enter Task Description"
              name="taskDes"
              id="taskDes"
            ></textarea>
          </div>
          <button type="submit">Add Task</button>
        </form>
      </div>
    </>
  );
};

export default CreateTask;
