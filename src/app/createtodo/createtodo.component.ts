import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TodoDataService } from '../services/todo-data.service';
import { User } from '../models/user';
import { Todo } from '../models/todo';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-createtodo',
  templateUrl: './createtodo.component.html',
  styleUrls: ['./createtodo.component.css']
})
export class CreatetodoComponent implements OnInit {
  private users: [User];
  formdata;
  constructor(
    private userService: UserService,
    private todoService: TodoDataService
  ) { }

  ngOnInit() {
    this.formdata = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      startDate: new FormControl('', Validators.compose([Validators.required])),
      endDate: new FormControl('', Validators.compose([Validators.required])),
      effort: new FormControl('', Validators.compose([Validators.required])),
      assignedUser: new FormControl('', Validators.compose([Validators.required])),
    });
    this.getUsers();
  }

  onClickSubmit(todo) {
    this.createTodo(todo);
  }


  getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users.rows;
    });
  }

  createTodo(todo: Todo) {
    this.todoService.createTodo(todo).subscribe((todoo) => {
      console.log('Create successfull', todoo);
      alert('Create todo successfull');
      this.formdata.reset();
    });
  }
}
