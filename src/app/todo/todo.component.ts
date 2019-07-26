import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public todo: Observable<Todo>;
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todo = this.todoService.getTodo(1);
  }
}
