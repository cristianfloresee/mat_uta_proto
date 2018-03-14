import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//MODULOS DEL CORE PERO QUE NO VIENEN POR DEFECTO
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SocketService } from './services/socket.service';

import { ChartsModule } from 'ng2-charts';
import { TransitionGroupComponent, TransitionGroupItemDirective } from './transition-group/transition-group.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResumenMatriculasComponent } from './components/resumen-matriculas/resumen-matriculas.component';
import { ResumenService } from './services/resumen.service';
import { ModalModule } from './modal/modal.module';
import { MatriculaNuevosComponent } from './components/matricula-nuevos/matricula-nuevos.component';
import { MatriculaAntiguosComponent } from './components/matricula-antiguos/matricula-antiguos.component';
import { MatriculaTotalComponent } from './components/matricula-total/matricula-total.component';
import { FormateadorService } from './services/formateador.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TransitionGroupComponent,
    TransitionGroupItemDirective,
    ResumenMatriculasComponent,
    MatriculaNuevosComponent,
    MatriculaAntiguosComponent,
    MatriculaTotalComponent
  ],
  imports: [
    ModalModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [
    SocketService, 
    ResumenService,
    FormateadorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
