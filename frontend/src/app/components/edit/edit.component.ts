import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/tasks.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {


  id: String;
  task: any = {};
  updateTaskForm: FormGroup;
  priorityValue = 0;

  constructor(private tasksService: TasksService,private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private formBuilder: FormBuilder ) {
    this.loadEditTaskForm();
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.tasksService.getTaskById(this.id).subscribe(res => {
        this.task = res;
        this.updateTaskForm.get("title").setValue(this.task.title);
        this.updateTaskForm.get("description").setValue(this.task.description);
        this.priorityValue = this.task.priority;
      });
    });
  }
  
  loadEditTaskForm(){
    this.updateTaskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: '',
      priority: 0
    });
  }

  editTask(title, description, priority){
    this.tasksService.updateTask(this.id, title, description, priority).subscribe(() => {
      this.router.navigate(['/']);
      this.snackBar.open('Task was updated successfully.', 'OK', {
        duration: 3000
      });
    });
  }
}
