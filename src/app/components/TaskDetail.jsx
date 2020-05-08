import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutations';

const TaskDetail = ({
  id,
  comments,
  task,
  isComplete,
  groups,
  setTaskCompletion,
  setTaskGroup,
  setTaskName,
}) => {
  return (
    <div>
      <input value={task.group}></input>
      <input onChange={setTaskName} value={task.name}></input>
      <div>
        <button onClick={() => setTaskCompletion(id, !isComplete)}>
          {isComplete ? 'Reopen' : 'Complete'}
        </button>
      </div>{' '}
      <select onChange={setTaskGroup} value={task.group}>
        {groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>
      <div>
        <Link to="/dashboard">
          <button>Done</button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  let task = state.tasks.find((task) => task.id === id);
  let groups = state.groups;
  return {
    id,
    task,
    groups,
    isComplete: task.isComplete,
  };
};

const mapDispatchToProps = (dispath, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    setTaskCompletion(id, isComplete) {
      dispath(mutations.setTaskCompletion(id, isComplete));
    },
    setTaskGroup(e) {
      dispath(mutations.setTaskGroup(id, e.target.value));
    },
    setTaskName(e) {
      dispath(mutations.setTaskName(id, e.target.value));
    },
  };
};

export const ConnectTaskDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetail);
