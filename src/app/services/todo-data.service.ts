import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {
  rootPath = 'todos';

  constructor(
    private apiService: ApiService,
  ) { }

  getTodos(): Observable<any> {
    const url = this.rootPath;
    return this.apiService.get(url);
  }

  getTodo(todo: Todo): Observable<any> {
    const url = this.rootPath;
    return this.apiService.get(url);
  }

  createTodo(todo: Todo): Observable<any> {
    const url = this.rootPath;
    return this.apiService.post(url, todo);
  }

  updateTodo(todo: Todo): Observable<any> {
    const url = `${this.rootPath}/${todo.id}`;
    return this.apiService.put(url, todo);
  }

  deleteTodo(todo: Todo): Observable<any> {
    const url = `${this.rootPath}/${todo.id}`;
    return this.apiService.delete(url);
  }
}
