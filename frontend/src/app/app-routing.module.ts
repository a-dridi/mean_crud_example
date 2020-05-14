import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './components/view/view.component';
import { EditComponent } from './components/edit/edit.component';
import { CreateComponent } from './components/create/create.component';


const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'view', component: ViewComponent },
  { path: '', redirectTo: 'view', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
