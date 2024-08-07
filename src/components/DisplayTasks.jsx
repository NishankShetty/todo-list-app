// import taskList from "../tasksList.js";
import { TaskContext } from "../utils/taskList";
import { useState, useContext } from "react";

const DisplayTasks = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const { taskList, addtask, updateTask, removeTask } = useContext(TaskContext);

  // const [tasks, setTasks] = useState(taskList);

  const handleCheckedItemsChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDeleteButton = (id) => {
    removeTask(id);
    console.log(taskList);
    // setTasks(tasks.filter((task) => task.id !== id));
  };
  // console.log(tasks);
  return (
    <>
      <div className="DisplayContainer">
        {taskList.map((task) => (
          <div key={task.id} className="unitTask">
            <input
              type="checkbox"
              className="checkbox"
              checked={checkedItems[task.id] || false}
              onChange={() => {
                handleCheckedItemsChange(task.id);
                console.log(task.id);
              }}
            ></input>
            <div className="name">
              <p
                className="pName"
                style={{
                  textDecoration: checkedItems[task.id]
                    ? "line-through"
                    : "none",
                }}
              >
                {task.name}
              </p>
              <button
                className="deleteBtn"
                onClick={() => handleDeleteButton(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplayTasks;
