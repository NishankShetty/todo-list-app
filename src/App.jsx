import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./css/App.css";
import CreateTask from "./components/createTask.jsx";
import DisplayTasks from "./components/DisplayTasks.jsx";
import { TaskProvider } from "./utils/taskList.jsx";

function App() {
  return (
    <>
      <TaskProvider>
        <CreateTask />
        <DisplayTasks />
      </TaskProvider>
    </>
  );
}

export default App;
