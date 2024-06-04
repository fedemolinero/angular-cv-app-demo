import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataWrapperComponent } from './data-wrapper/data-wrapper.component';

const routes: Routes = [
  { path: '', component: DataWrapperComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
