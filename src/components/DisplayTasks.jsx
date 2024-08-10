// import taskList from "../tasksList.js";
import { TaskContext } from "../utils/taskList";
import { useState, useContext } from "react";

const DisplayTasks = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const [expandedItems, setExpandedItems] = useState({});

  const { taskList, addtask, updateTask, removeTask } = useContext(TaskContext);

  const handleCheckedItemsChange = (id, event) => {
    event.stopPropagation();
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExpansionOnClick = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDeleteButton = (id, event) => {
    if (event) event.stopPropagation();
    removeTask(id);
    setExpandedItems((prev) => {
      delete prev[id];
      return prev;
    });
    setCheckedItems((prev) => {
      delete prev[id];
      return prev;
    });
  };

  const handleClearAllCheckedTasks = () => {
    console.log(checkedItems);
    Object.entries(checkedItems)
      .filter(([key, value]) => value === true)
      .forEach((taskId) => {
        console.log(taskId);
        handleDeleteButton(Number(taskId[0]));
      });
  };
  console.log(expandedItems);
  return (
    <>
      <div className="DisplayContainer">
        {taskList.map((task) => (
          <div
            key={task.id}
            className={`unitTask ${expandedItems[task.id] ? "expanded" : ""}`}
            onClick={() => handleExpansionOnClick(task.id)}
          >
            <div className="unitContainer">
              <input
                type="checkbox"
                className="checkbox"
                checked={checkedItems[task.id] || false}
                onChange={(event) => handleCheckedItemsChange(task.id, event)}
                onClick={(event) => event.stopPropagation()}
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
                <div className="btnsContainer">
                  <button className="updateBtn">
                    <img src="src/update.png"></img>
                  </button>
                  <button
                    className="deleteBtn"
                    onClick={(event) => handleDeleteButton(task.id, event)}
                  >
                    <img src="../deleteBtn_White.png"></img>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {console.log(
          Object.values(checkedItems).filter((val) => val === true).length
        )}
        {Object.values(checkedItems).filter((val) => val === true).length >
          1 && (
          <button onClick={handleClearAllCheckedTasks}>
            Clear All Completed Tasks
          </button>
        )}
      </div>
    </>
  );
};

export default DisplayTasks;
