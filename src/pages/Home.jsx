import React from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Home = ({ tasks, addTask, removeTask, editTask }) => {
    return (
        <div>
            <TaskForm addTask={addTask} />
            <h2 className='text-center my-4 font-bold text-2xl text-white'>My Tasks</h2>
            <TaskList 
                tasks={tasks} 
                removeTask={removeTask} 
                editTask={editTask} 
            />
        </div>
    );
};

export default Home;
