import { TaskAction, TaskActionTypes } from "../actions/tasks.actions";

let counter: number = 1;

function isEmptyOrSpaces(str: string): boolean {
  return str === null || str.match(/^ *$/) !== null;
}

export function TaskReducer(state: any = [], action: TaskAction) {
  switch (action.type) {
    case TaskActionTypes.LOAD_TASKS:
      return action.payload;

    case TaskActionTypes.ADD_ITEM:
      if (!isEmptyOrSpaces(action.payload.name)) {
        return [...state, action.payload];
      }

    case TaskActionTypes.DELETE_ITEMS:
      if (action.payload == null) {
        return state.filter(item => item.status == true);
      }
      return state.filter(item => item.id !== action.payload);

    case TaskActionTypes.MARK_COMPLETED:
      if (action.payload == null) {
        if (++counter % 2 == 0) {
          state.forEach(element => {
            element.status = false;
          });
        } else {
          state.forEach(element => {
            element.status = true;
          });
        }
      }
      state.forEach(element => {
        if (element.id == action.payload) element.status = !element.status;
      });
      return state;

    default:
      return state;
  }
}
