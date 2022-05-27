import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: 'full',
    component: TableComponent
    // redirectTo: '/users'
  },
  {
    path: "users",
    component: TableComponent
    // children: [
    //   {
    //     path: ":id",
    //     component: ModalComponent
    //   }
    // ]
  },
  { 
    path: "users/:id",
    component: ModalComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }