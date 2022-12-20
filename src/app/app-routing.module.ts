import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditAboutComponent } from './components/about/edit-about.component';
import { EditPersonaComponent } from './components/about/edit-persona.component';
import { EditContactComponent } from './components/contact/edit-contact.component';
import { LoginComponent } from './components/login/login.component';

import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { EditProjectComponent } from './components/projects/edit-project.component';
import { NewProjectComponent } from './components/projects/new-project.component';
import { EditSkillComponent } from './components/skills/edit-skill.component';
import { NewSkillComponent } from './components/skills/new-skill.component';

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
        path: 'newskill',
        component: NewSkillComponent
    },
    {
        path: 'editskill/:id',
        component: EditSkillComponent
    },
    {
        path: 'editabout/:id',
        component: EditAboutComponent
    },
    {
        path: 'editpersona/:id',
        component: EditPersonaComponent
    },
    {
        path: 'editcontact/:id',
        component: EditContactComponent
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