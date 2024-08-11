// import taskList from "../tasksList.js";
import { TaskContext } from "../utils/taskList";
import { useState, useContext } from "react";

const DisplayTasks = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const [expandedItems, setExpandedItems] = useState({});

  const [editData, setEditData] = useState({
    name: "",
    des: "",
  });

  const [editItem, setEditItem] = useState(null);

  const { taskList, addtask, updateTask, removeTask } = useContext(TaskContext);

  const handleCheckedItemsChange = (id, event) => {
    event.stopPropagation();
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExpansionOnClick = (id) => {
    if (editItem !== id) {
      setExpandedItems((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    }
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
    setEditItem(null);
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
  const handleEditButton = (task, event) => {
    event.stopPropagation(); // Stopping the event from bubbling up.
    //handle the expansion if not expaneded expand or else leave the same
    if (!expandedItems[task.id])
      setExpandedItems((prev) => ({
        ...prev,
        [task.id]: !prev[task.id],
      }));
    console.log(task.id);
    if (editItem === task.id) expandedItems[task.id] = false;
    setEditItem((prev) => (prev === task.id ? null : task.id));
    setEditData({ id: task.id, name: task.name, des: task.des });
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    console.log(value);
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditDataSave = () => {
    if (editItem !== null) {
      updateTask(editItem, editData.name, editData.des);
      setEditItem(null);
    }
  };

  // console.log(JSON.stringify(editItem));
  // console.log(JSON.stringify(editData));
  console.log(taskList);

  // console.log(expandedItems);
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
                {editItem === task.id ? (
                  <div className="inputDiv">
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      className="editInput"
                      onChange={handleEditInputChange}
                      onClick={(event) => event.stopPropagation()}
                    ></input>
                    <button className="saveBtn" onClick={handleEditDataSave}>
                      <img src="src\save.png"></img>
                    </button>
                  </div>
                ) : (
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
                )}

                <div className="btnsContainer">
                  <button className="updateBtn">
                    <img
                      src="src/update.png"
                      onClick={(event) => handleEditButton(task, event)}
                    ></img>
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
            {expandedItems[task.id] &&
              (editItem === task.id ? (
                <textarea
                  name="des"
                  className="editDes"
                  value={editData.des}
                  placeholder="Add Description"
                  onChange={handleEditInputChange}
                ></textarea>
              ) : (
                <p className="taskDes_Display">{`${
                  task.des || "No Description"
                }`}</p>
              ))}
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
