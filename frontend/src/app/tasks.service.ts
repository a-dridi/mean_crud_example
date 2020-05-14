import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  API_URL = "http://127.0.0.1:4000/api";

  constructor(private httpClient: HttpClient) { }

  getTaskById(id) {
    return this.httpClient.get(`${this.API_URL}/task/${id}`);
  }

  getTasks() {
    return this.httpClient.get(`${this.API_URL}/tasks`);
  }

  addTask(title, description, priority) {
    const newTask = {
      title: title,
      description: description,
      priority: priority
    };
    return this.httpClient.post(`${this.API_URL}/task/add`, newTask);

  }

  updateTask(id, title, description, priority) {
    const updatedTask = {
      title: title,
      description: description,
      priority: priority
    };
    return this.httpClient.post(`${this.API_URL}/task/update/${id}`, updatedTask)
  }

  deleteTaskById(id) {
    return this.httpClient.get(`${this.API_URL}/task/delete/${id}`);
  }

  deleteAllTasks() {
    return this.httpClient.get(`${this.API_URL}/task/deleteall`);
  }



}
