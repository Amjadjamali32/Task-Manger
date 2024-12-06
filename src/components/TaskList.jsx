import React, { useState } from "react";
import { toast } from 'react-toastify'

const TaskList = ({ tasks, removeTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const handleEdit = (index, title) => {
    setIsEditing(index);
    setNewTitle(title);
  };

  const saveEdit = (index) => {
    if (!newTitle.trim()) {
      toast.error("Task title cannot be empty!");
      return;
    }
  
    if (!tasks[index]) {
      console.error(`Task at index ${index} does not exist.`);
      return;
    }
  
    const updatedTask = { ...tasks[index], title: newTitle };
    editTask(index, updatedTask);  // This should now work properly
    setIsEditing(null);
    setNewTitle("");
  };

  return (
    <div>
      {tasks.length ? (
        <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task, index) => (
            <li key={task.id || index} className="p-3 bg-white shadow rounded">
              {isEditing === index ? (
                <>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="p-2 border border-gray-300 rounded w-full"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => saveEdit(index)}
                      className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(null)}
                      className="px-4 py-2 bg-gray-500 text-white rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="font-bold">{task.title}</h3>
                  <p className="text-sm text-gray-500">{task.category}</p>
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => handleEdit(index, task.title)}
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeTask(index)}
                      className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Remove
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white text-center">No tasks to display!</p>
      )}
    </div>
  );
};

export default TaskList;
