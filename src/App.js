import React, { useState } from 'react';
import BoardColumn from './BoardColumn';
import './index.css';

const tasks = [
  { id: 1, content: 'shopping', status: 'to-do' },
  { id: 2, content: 'study', status: 'in-progress' },
  { id: 3, content: 'gym', status: 'done' }
];

function App() {
  const [taskList, setTaskList] = useState(tasks);
  const [newTaskContent, setNewTaskContent] = useState('');

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData('task', JSON.stringify(task));
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    const droppedTask = JSON.parse(e.dataTransfer.getData('task'));
    const updatedTasks = taskList.map(task => {
      if (task.id === droppedTask.id) {
        return { ...task, status };
      }
      return task;
    });
    setTaskList(updatedTasks);
  };

  const handleNewTaskInputChange = e => {
    setNewTaskContent(e.target.value);
  };

  const handleNewTaskSubmit = e => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      content: newTaskContent,
      status: 'to-do'
    };
    setTaskList([...taskList, newTask]);
    setNewTaskContent('');
  };

  const handleDeleteTask = taskId => {
    const updatedTasks = taskList.filter(task => task.id !== taskId);
    setTaskList(updatedTasks);
  };

  return (
    <div className="kanban-board">
      <BoardColumn
        status="to-do"
        taskList={taskList}
        handleDragStart={handleDragStart}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
        handleDeleteTask={handleDeleteTask}
      />
      <BoardColumn
        status="in-progress"
        taskList={taskList}
        handleDragStart={handleDragStart}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
        handleDeleteTask={handleDeleteTask}
      />
      <BoardColumn
        status="done"
        taskList={taskList}
        handleDragStart={handleDragStart}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
        handleDeleteTask={handleDeleteTask}
      />
      <form id='todo-form' className='addNew' onSubmit={handleNewTaskSubmit}>
        <input
          type="text"
         id='todo-input'
          placeholder="Add a new task..."
          value={newTaskContent}
          onChange={handleNewTaskInputChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
