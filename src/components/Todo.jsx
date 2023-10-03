import React, { useState, useEffect } from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
import { BiTrash } from 'react-icons/bi';
import Confirm from './Confirm';
import { nanoid } from 'nanoid';

const Todo = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('localTask')) {
      const storedList = JSON.parse(localStorage.getItem('localTask'));
      setTasks(storedList);
    }
  }, []);

  const addTask = () => {
    if (task) {
      const newTask = { id: nanoid(), title: task };
      const updatedTasks = [newTask, ...tasks];
      setTasks(updatedTasks);
      localStorage.setItem('localTask', JSON.stringify(updatedTasks));
      setTask('');
    }
  };

  const handleToggle = clickedTask => {
    const updatedTasks = tasks.map(task => {
      if (task.id === clickedTask.id) {
        return { ...task, isUnderlined: !task.isUnderlined };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('localTask', JSON.stringify(updatedTasks));
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTask();
    }
  };

  const handleDelete = i => {
    const deleted = [...tasks];
    deleted.splice(i, 1);
    setTasks(deleted);
    localStorage.setItem('localTask', JSON.stringify(deleted));
  };

  const clearTask = () => {
    setTasks([]);
    localStorage.removeItem('localTask');
  };

  const showConfirm = () => {
    document.querySelector('.confirm').classList.toggle('hidden');
  };

  return (
    <div className='h-screen bg-red-600 bg-contain'>
      <div className='w-full bg-inherit p-4'>
        <div className='max-w-[350px] mx-auto bg-white/90 rounded-xl text-center relative'>
          <h1 className='text-3xl font-bold flex w-full justify-center gap-2 p-2 inset-0 rounded-xl'>
            <span>
              <FaShoppingBasket
                size={35}
                className='text-white  rounded-full bg-red-600 p-1'
              />
            </span>
            Zakupki
          </h1>
        </div>
        <div className='flex flex-col max-w-[350px] mx-auto bg-white/90 text-center rounded-xl mt-3 p-3'>
          <div className='flex justify-between items-center w-full pl-1'>
            <form className='w-full'>
              <input
                type='text'
                value={task}
                placeholder='Wpisz produkt'
                className='w-full outline-none bg-transparent border-b border-red-600 my-2 pb-[5px] no-underline'
                onKeyDown={handleKeyDown}
                onChange={e => setTask(e.target.value)}
              ></input>
            </form>
          </div>
          {tasks.map((task, i) => (
            <React.Fragment key={i}>
              <div className='flex justify-between items-center p-2 transition-all duration-200'>
                <div
                  className={`text-left w-[90%] break-words ${
                    task.isUnderlined ? 'line-through' : ''
                  }`}
                  onClick={() => handleToggle(task)}
                >
                  {task.title}
                </div>
                <div>
                  <BiTrash
                    size={25}
                    className='text-red-600 text-base  cursor-pointer'
                    onClick={() => handleDelete(i)}
                  />
                </div>
              </div>
            </React.Fragment>
          ))}

          {!tasks.length ? null : (
            <div
              onClick={showConfirm}
              className='w-full mt-3 bg-red-600 text-white rounded-xl p-2 cursor-pointer'
            >
              <button>Wyczyść liste</button>
              <Confirm clearTask={clearTask} />
            </div>
          )}

          <p className='text-sm pt-2'>
            {!tasks.length
              ? 'brak produktów'
              : tasks.length === 1
              ? `na liście jest ${tasks.length} produkt`
              : tasks.length > 1
              ? `liczba produktów na liście: ${tasks.length}`
              : null}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Todo;
