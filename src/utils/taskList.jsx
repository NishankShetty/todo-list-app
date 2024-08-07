import React, { useState, createContext } from "react";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);

  const addtask = (name, des) => {
    setTaskList((prevList) => [
      ...prevList,
      {
        id:
          prevList.length > 0
            ? Math.max(...prevList.map((task) => task.id)) + 1
            : 1,
        name: name,
        des: des,
      },
    ]);
  };

  const removeTask = (id) => {
    setTaskList((prevList) => prevList.filter((task) => task.id !== id));
  };

  const updateTask = (id, name, des) => {
    setTaskList((prevList) => [
      prevList.map((task) => {
        task.name = task.id === id ? name : task.name;
        task.des = task.id === id ? des : task.des;
        return task;
      }),
    ]);
  };

  return (
    <TaskContext.Provider value={{ taskList, addtask, updateTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
