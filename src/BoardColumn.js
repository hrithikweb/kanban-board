import React from 'react';

function BoardColumn({
  status,
  taskList,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDeleteTask
}) {
  return (
    <div
      className={`column ${status}`}
      onDragOver={e => handleDragOver(e)}
      onDrop={e => handleDrop(e, status)}
    >
      <h2>{status[0].toUpperCase() + status.slice(1)}</h2>
      <ul className="task-list">
        {taskList
          .filter(task => task.status === status)
          .map(task => (
            <li
              key={task.id}
              draggable
              onDragStart={e => handleDragStart(e, task)}
              onClick={() => handleDeleteTask(task.id)}
            >
              {task.content}
              <button className="delete-task-button">x</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default BoardColumn;
