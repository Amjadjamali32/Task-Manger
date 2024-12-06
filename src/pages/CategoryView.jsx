import React from 'react';
import { useParams } from 'react-router-dom';
import TaskList from '../components/TaskList';

const CategoryView = ({ tasks, removeTask, editTask }) => {
    const { category } = useParams(); 
    
    // Filter tasks by the selected category
    const filteredTasks = tasks.filter((task) => task.category === category);

    return (
        <div>
            <h2 className="text-center my-4 font-bold text-2xl text-white">
                Tasks in {category} Category
            </h2>
            <TaskList
                tasks={filteredTasks}
                removeTask={removeTask}
                editTask={editTask}
            />
        </div>
    );
};

export default CategoryView;
