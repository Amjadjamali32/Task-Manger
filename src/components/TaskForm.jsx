import React, { useState } from 'react';
import { categories } from '../categories.js';
import { toast } from 'react-toastify'

const TaskForm = ({ addTask }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(categories[0]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            addTask({ title, category });
            setTitle('');
        }

        if (!title.trim()) {
            toast.error('Task title cannot be empty!');
            return;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 max-w-lg mx-auto">
            <div className="flex flex-col md:flex-row gap-2 mb-2">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task title"
                    className="flex-1 p-2 border border-gray-300 rounded"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                >
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                    {cat}
                    </option>
                ))}
                </select>
            </div>
            <div className="text-center mt-4">
                <button type="submit" className="px-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Add Task
                </button>
            </div>
        </form>
    );
};

export default TaskForm;
