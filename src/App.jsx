import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CategoryView from "./pages/CategoryView";
import { categories } from "./categories.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import logo from "./assets/logo.png";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
    toast.success("Task added successfully!"); 
  }

  const removeTask = (index) => {
    setTasks(tasks.filter((_, taskIndex) => taskIndex !== index));
    if (tasks.length === 1) {
      toast.warn("All tasks are removed!");  
    }
  }
  
  const editTask = (index, updatedTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks]; // Create a copy of the previous tasks
      updatedTasks[index] = updatedTask; // Update the task at the specific index
      return updatedTasks;
    });
    if (updatedTask) {
      toast.info("Task updated successfully!"); 
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-black p-5 flex flex-col">
        <nav className="my-6 flex flex-wrap gap-4 items-center justify-center">
          <div className="flex items-center">
            <img src={logo} alt="logo" className="w-12 md:w-16" />
            <h2 className="text-white font-bold text-3xl mx-2 mt-3">Task Manager</h2>
          </div>
          <div className="flex flex-wrap gap-4 justify-center w-full">
            <Link
              to="/"
              className="text-blue-500 hover:underline text-sm md:text-lg"
            >
              Home
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category}`}
                className="text-yellow-400 hover:underline text-sm md:text-lg mx-2 text-center"
              >
                {category}
              </Link>
            ))}
          </div>
        </nav>
        <div className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  tasks={tasks}
                  addTask={addTask}
                  removeTask={removeTask}
                  editTask={editTask}
                />
              }
            />
            <Route
              path="/category/:category"
              element={
                <CategoryView
                  tasks={tasks}
                  removeTask={removeTask}
                  editTask={editTask}
                />
              }
            />
          </Routes>
        </div>
      </div>
      {/* Add ToastContainer to display toast notifications */}
      <ToastContainer />
    </Router>
  );
};

export default App;
