import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../services/todo-data.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  todos: [Todo];
  constructor(private todoSerice: TodoDataService) { }

  ngOnInit() {
    this.todoSerice.getTodos().subscribe((todos) => {
      this.todos = todos.rows;
    });
  }

}
