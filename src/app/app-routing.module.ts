import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { EditProjectComponent } from './components/projects/edit-project.component';
import { NewProjectComponent } from './components/projects/new-project.component';

const routes: Routes = [
    {
        path: '',
        component: PortfolioComponent,
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'newproject',
        component: NewProjectComponent
    },
    {
        path: 'editproject/:id',
        component: EditProjectComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}