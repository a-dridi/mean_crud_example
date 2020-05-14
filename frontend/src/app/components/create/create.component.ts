import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/tasks.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createTaskForm: FormGroup;
  priorityValue = 0;

  constructor(private snackBar: MatSnackBar, private tasksService: TasksService, private formBuilder: FormBuilder, private router: Router) {
    this.createTaskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: '',
      priority: 0
    });
  }

  ngOnInit(): void {
  }

  createTask(title, description, priority) {
    this.tasksService.addTask(title, description, priority).subscribe(() => {
      this.router.navigate(['/']);
      this.snackBar.open("OK. Task was added.", "OK", {
        duration: 4000
      });
    })
  }

}
