import { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import NewTask from './components/NewTask.js';
import getBlockchain from './ethereum.js';
import './style.css';

function App() {
  const [tasks, setTasks] = useState(undefined);
  const [todo, setTodo] = useState(undefined);

  useEffect(() => {
     const init = async () => {
       const { todo } = await getBlockchain();
       const tasks = await todo.getTasks();
       setTodo(todo);
       setTasks(tasks);
     };
     init();
  }, []);

  const createTask = async (content, author) => {
    const tx = await todo.createTask(content, author)
    await tx.wait();
    const tasks = await todo.getTasks(); 
    setTasks(tasks);
  }

  const toggleDone = async id => {
    const tx = await todo.toggleDone(id);
    await tx.wait();
    const tasks = await todo.getTasks(); 
    setTasks(tasks);
  }

  return (
    <div id="App">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <NewTask createTask={createTask} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <TaskList tasks={tasks} toggleDone={toggleDone} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
