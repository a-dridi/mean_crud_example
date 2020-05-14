import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/tasks.service';
import { Router } from '@angular/router';
import { Tasks } from 'src/tasks.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  tasks: Tasks[];
  tableColumns = ['title', 'description', 'priority', 'edit'];

  constructor(private snackBar: MatSnackBar, private tasksService: TasksService, private router: Router) { 
    this.loadTasks();
  }

  ngOnInit(): void {
  }

  loadTasks() {
    this.tasksService.getTasks().subscribe((tasksData: Tasks[]) => {
      this.tasks = tasksData;
    });
  }

  editTask(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteTask(id) {
    this.tasksService.deleteTaskById(id).subscribe(() => {
      this.loadTasks();
      this.snackBar.open("Task was deleted.", "OK", {
        duration: 4000
      });
    })
  }
}


