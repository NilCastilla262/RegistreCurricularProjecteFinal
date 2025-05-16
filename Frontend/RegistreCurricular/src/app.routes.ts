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
import { ManageTeachersComponent } from './components/manage-teachers/manage-teachers.component';
import { ManageGroupsComponent } from './components/manage-groups/manage-groups.component';
import { ManageUserGroupsComponent } from './components/manage-user-groups/manage-user-groups.component';
import { ChangeCenterComponent } from './components/change-center/change-center.component';

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
        {
        path: 'manage-teachers',
        component: ManageTeachersComponent,
        canActivate: [AdminCenterGuard],
    },
    {
        path: 'manage-groups',
        component: ManageGroupsComponent,
        canActivate: [AdminCenterGuard],
    },
    {
        path: 'manage-user-groups/:uuid',
        component: ManageUserGroupsComponent,
        canActivate: [AdminCenterGuard],
    },
    {
        path: 'change-center',
        component: ChangeCenterComponent,
        canActivate: [TeacherGuard],
    },
];
