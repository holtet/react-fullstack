import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { defaultState } from '../../server/defaultState';
import * as mutations from './mutations';
import * as sagas from './sagas.mock';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({
    tasks(tasks = defaultState.tasks, action) {
      switch (action.type) {
        // case mutations.REQUEST_TASK_CREATION:
        //   console.log('REQ TASK');
        //   break;
        case mutations.CREATE_TASK:
          return [
            ...tasks,
            {
              id: action.taskID,
              name: 'newTask',
              group: action.groupID,
              owner: action.ownerID,
            },
          ];
        case mutations.SET_TASK_COMPLETE:
          return tasks.map((task) =>
            task.id === action.taskID
              ? { ...task, isComplete: action.isComplete }
              : task
          );
        case mutations.SET_TASK_GROUP:
          return tasks.map((task) =>
            task.id === action.taskID
              ? { ...task, group: action.groupID }
              : task
          );
        case mutations.SET_TASK_NAME:
          return tasks.map((task) =>
            task.id === action.taskID ? { ...task, name: action.name } : task
          );
      }
      return tasks;
    },
    comments(comments = defaultState.comments) {
      return comments;
    },
    groups(groups = defaultState.groups) {
      return groups;
    },
    users(users = defaultState.users) {
      return users;
    },
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}
