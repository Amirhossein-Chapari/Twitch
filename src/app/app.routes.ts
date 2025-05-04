import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ClipComponent } from './components/clip/clip.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'video',
    loadChildren: () =>
      import('./modules/video/video.module').then(m => m.VideoModule),
    canActivate: [AuthGuard]
  },
  { path: 'clip/:id', component: ClipComponent },
  { path: '**', component: NotFoundComponent }
];
