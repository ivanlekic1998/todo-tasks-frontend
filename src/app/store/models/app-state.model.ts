import { TaskItem } from "../models/task-item.model";

export interface AppState {
  readonly task: Array<TaskItem>;
}
