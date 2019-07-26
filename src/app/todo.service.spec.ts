import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { Todo } from './todo';

describe('TodoService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: []
    })
  );

  it('should be created', () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
  });

  it('should throw an exception because of invalid parameter', () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(function() {
      service.getTodo(null);
    }).toThrow();
  });

  it('should perform a mocked http request', (done: DoneFn) => {
    const service: TodoService = TestBed.get(TodoService);

    const mockResponse = {
      userId: 1,
      id: 2,
      title: 'Title',
      completed: false
    };

    service.getTodo(1).subscribe((todo: Todo) => {
      expect(todo).toBeTruthy();
      expect(todo.userId).toBe(mockResponse.userId);
      expect(todo.todoId).toBe(mockResponse.id);
      expect(todo.title).toBe(mockResponse.title);
      expect(todo.workDone).toBe(mockResponse.completed);
      expect(todo.loadTime).toBeTruthy();
      done();
    });

    const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
    const mockRequest = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/todos/1'
    );
    mockRequest.flush(mockResponse);
  });
});
