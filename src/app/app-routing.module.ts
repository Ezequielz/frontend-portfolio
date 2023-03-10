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
import { AuthGuard } from './services/guards/auth.guard';
import { EditFormacionComponent } from './components/about/edit-formacion.component';
import { NewFormacionComponent } from './components/about/new-formacion.component';
import { NewExperienciaComponent } from './components/about/new-experiencia.component';
import { EditExperienciaComponent } from './components/about/edit-experiencia.component';


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
        component: NewProjectComponent,
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
    },
    {
        path: 'editproject/:id',
        component: EditProjectComponent,
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
    },
    {
        path: 'newskill',
        component: NewSkillComponent,
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
    },
    {
        path: 'editskill/:id',
        component: EditSkillComponent,
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
    },
    {
        path: 'editabout/:id',
        component: EditAboutComponent,
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
    },
    {
        path: 'newformacion',
        component: NewFormacionComponent,
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
    },
    {
        path: 'editformacion/:id',
        component: EditFormacionComponent,
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
    },
    {
        path: 'newexperiencia',
        component: NewExperienciaComponent,
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
    },
    {
        path: 'editexperiencia/:id',
        component: EditExperienciaComponent,
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
    },
    {
        path: 'editpersona/:id',
        component: EditPersonaComponent,
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
    },
    {
        path: 'editcontact/:id',
        component: EditContactComponent,
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
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