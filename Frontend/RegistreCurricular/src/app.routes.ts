import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChooseCenterComponent } from './components/choose-center/choose-center.component';
import { CreateSdaComponent } from './components/create-sda/create-sda.component';
import { ListSdaComponent } from './components/list-sda/list-sda.component';
import { ShowSdaComponent } from './components/show-sda/show-sda.component';
import { CreateResumeComponent } from './components/create-resume/create-resume.component';
import { ShowResumeComponent } from './components/show-resume/show-resume.component';
import { AdminCenterGuard } from './guards/admin-center.guard';
import { TeacherGuard } from './guards/teacher.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'choose-center',
        component: ChooseCenterComponent,
    },
    {
        path: 'create-sda',
        component: CreateSdaComponent,
        canActivate: [TeacherGuard],
    },
    {
        path: 'list-sda',
        component: ListSdaComponent,
        canActivate: [TeacherGuard],
    },
    {   path: 'show-sda/:uuid',
        component: ShowSdaComponent,
        canActivate: [TeacherGuard],
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [TeacherGuard],
    },
    {
        path: 'create-resume',
        component: CreateResumeComponent,
        canActivate: [TeacherGuard],
    },
    {
        path: 'show-resume',
        component: ShowResumeComponent,
        canActivate: [TeacherGuard],
    },
];
