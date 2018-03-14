import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ResumenMatriculasComponent } from './components/resumen-matriculas/resumen-matriculas.component';


const routes: Routes = [
  { path: '', component: ResumenMatriculasComponent},
  { path: 'resumen', component: ResumenMatriculasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
