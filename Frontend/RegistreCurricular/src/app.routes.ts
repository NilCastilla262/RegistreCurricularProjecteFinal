import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChooseCenterComponent } from './components/choose-center/choose-center.component';
import { CreateSdaComponent } from './components/create-sda/create-sda.component';
import { ListSdaComponent } from './components/list-sda/list-sda.component';
import { ShowSdaComponent } from './components/show-sda/show-sda.component';
import { CreateResumeComponent } from './components/create-resume/create-resume.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
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
    },
    {
        path: 'list-sda',
        component: ListSdaComponent,
    },
    {   path: 'show-sda/:uuid', 
        component: ShowSdaComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'create-resume',
        component: CreateResumeComponent,
    },
];
