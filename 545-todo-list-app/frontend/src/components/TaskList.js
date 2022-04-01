const formatDate = rawDate => {
  if (!rawDate) { return '' }
  const _date = new Date(parseInt(rawDate));
  const date = `${_date.getDate() + 1}/${_date.getMonth() + 1}/${_date.getFullYear()}`;
  const time = `${_date.getHours()}h ${_date.getMinutes()}m`; 
  return `${date} - ${time}`;
};

function TaskList({tasks, toggleDone}) {
  const renderTask = task => (
    <tr key={task.id}>
      <td>{task.id.toString()}</td>
      <td>{formatDate(task.date.toString())}</td>
      <td>{task.content}</td>
      <td>{task.author}</td>
      <td>
        <input
          type='checkbox'
          onChange={() => toggleDone(task.id.toString())}
          checked={!!task.done}
        />
      </td>
      <td>{task.dateComplete.toString() !== '0' ? formatDate(task.dateComplete.toString()) : ''}</td>
    </tr>
  );
  
  return (
    <div className="card">
      <div className="row">
        <div className="col-sm-12">
          <h2 className="orange">Tasks</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Content</th>
                <th>Author</th>
                <th>Done</th>
                <th>Date Complete</th>
              </tr>
            </thead>
            <tbody id="tasks">
              {tasks && tasks.map((task) => renderTask(task))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskList; 
