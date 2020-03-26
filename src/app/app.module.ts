import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { StoreModule } from "@ngrx/store";
import { TaskReducer } from "./store/reducers/task.reducer";
import { FormsModule } from "@angular/forms";
import { DataService } from "../app/shared/dataService";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      task: TaskReducer
    })
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
