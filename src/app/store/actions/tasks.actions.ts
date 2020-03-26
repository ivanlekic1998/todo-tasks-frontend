import { Action } from "@ngrx/store";
import { TaskItem } from "../models/task-item.model";

export enum TaskActionTypes {
  ADD_ITEM = "[TASK] Add item",
  DELETE_ITEMS = "[TASK] Delete item",
  FILTER_ITEMS = "[TASK] Filter item",
  MARK_COMPLETED = "[TASK] Mark completed item",
  LOAD_TASKS = "[TASK] Load tasks"
}

export class LoadTasks implements Action {
  readonly type = TaskActionTypes.LOAD_TASKS;

  constructor(public payload: TaskItem[]) {}
}

export class AdditemAction implements Action {
  readonly type = TaskActionTypes.ADD_ITEM;

  constructor(public payload: TaskItem) {}
}

export class DeleteItemAction implements Action {
  readonly type = TaskActionTypes.DELETE_ITEMS;

  constructor(public payload: string) {}
}

export class FilterItems implements Action {
  readonly type = TaskActionTypes.FILTER_ITEMS;
  constructor(public payload: string) {}
}

export class MarkCompleted implements Action {
  readonly type = TaskActionTypes.MARK_COMPLETED;
  constructor(public payload: any) {}
}

export type TaskAction =
  | AdditemAction
  | DeleteItemAction
  | FilterItems
  | MarkCompleted
  | LoadTasks;
