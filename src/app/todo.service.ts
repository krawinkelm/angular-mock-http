import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) {}

  public getTodo(id: number): Observable<Todo> {
    if (!id) {
      throw new TypeError('Unable to load todo');
    }

    return this.http
      .get('https://jsonplaceholder.typicode.com/todos/' + id)
      .pipe(
        map(response => {
          const xx: Todo = {
            todoId: response['id'],
            userId: response['userId'],
            title: response['title'],
            workDone: response['completed'],
            loadTime: Date.now()
          };
          return xx;
        })
      );
  }
}
