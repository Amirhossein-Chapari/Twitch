import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from '../manage/manage.component';
import { UploadComponent } from '../upload/upload.component';

const routes: Routes = [
  {
    path:'manage',
    component:ManageComponent
  },
  {
    path: 'upload',
    component: UploadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }