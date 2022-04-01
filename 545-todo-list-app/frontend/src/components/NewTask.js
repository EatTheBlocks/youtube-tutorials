//import React from 'react';

function NewTask({createTask}) {
  const onSubmit = e => {
    e.preventDefault();
    createTask(
      e.target.elements[0].value,
      e.target.elements[1].value
    );
  }

  return (
    <div className="card">
      <div className="row">
        <div className="col-sm-12">
          <h2 className="orange">Create Task</h2>
        </div>
      </div>
      <div className="row">
        <form id="new-task" className="col-sm-12" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="task-content">Content</label>
            <input id="task-content" type="text" className="form-control"></input>
          </div>
          <div className="form-group">
              <label htmlFor="task-author">Author</label>
              <input id="task-author" type="text" className="form-control"></input>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default NewTask;
