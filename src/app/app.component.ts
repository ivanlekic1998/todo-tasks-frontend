import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { TaskItem } from "./store/models/task-item.model";
import { Store } from "@ngrx/store";
import { AppState } from "./store/models/app-state.model";
import { DataService } from "./shared/dataService";
import {
  AdditemAction,
  DeleteItemAction,
  MarkCompleted
} from "./store/actions/tasks.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  taskItems$: Observable<Array<TaskItem>>;
  newTaskItem: TaskItem = { id: undefined, name: "", status: true };
  selectedFilter: string = "all";

  constructor(private store: Store<AppState>, private data: DataService) {}

  ngOnInit(): void {
    this.taskItems$ = this.store.select(store => store.task);

    this.data.loadTasks().subscribe();
  }

  addItem(): void {
    this.newTaskItem.id = Math.random()
      .toString(36)
      .substring(7);

    this.store.dispatch(new AdditemAction(this.newTaskItem));
    this.data.addTask(this.newTaskItem).subscribe();

    this.newTaskItem = { id: undefined, name: "", status: true };
  }

  deleteItem(id: string = null): void {
    this.store.dispatch(new DeleteItemAction(id));
  }

  filterItems(criteria: boolean = null, selectedFilter: string = "all"): void {
    this.selectedFilter = selectedFilter;
    if (criteria) {
      this.taskItems$ = this.store.select(store =>
        store.task.filter(task => task.status)
      );
    } else if (!criteria) {
      this.taskItems$ = this.store.select(store =>
        store.task.filter(task => !task.status)
      );
    }
    if (criteria == null) {
      this.taskItems$ = this.store.select(store => store.task);
    }
  }

  markCompleted(id: any = null): void {
    this.store.dispatch(new MarkCompleted(id));
  }
}
