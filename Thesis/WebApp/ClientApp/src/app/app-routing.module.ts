import { SprintOverviewComponent } from './sprint-overview/sprint-overview.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'sprint-overview', pathMatch: 'full'},
    { path: 'sprint-overview', component: SprintOverviewComponent },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
