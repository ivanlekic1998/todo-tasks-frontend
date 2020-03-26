import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../store/models/app-state.model";
import * as TasksActions from "../store/actions/tasks.actions";
import { TaskItem } from "../store/models/task-item.model";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  loadTasks(): Observable<TaskItem[]> {
    return this.http
      .get<TaskItem[]>("http://localhost:5000/api/v1/tasks")
      .pipe(tap(data => this.store.dispatch(new TasksActions.LoadTasks(data))));
  }

  addTask(task): Observable<TaskItem> {
    return this.http.post<TaskItem>(
      "http://localhost:5000/api/v1/tasks",
      JSON.stringify(task),
      httpOptions
    );
  }
}
