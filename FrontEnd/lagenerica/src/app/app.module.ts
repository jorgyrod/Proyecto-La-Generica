import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Inicio servicio carga javascript

import { CargarScriptsService } from './pages/cargar-scripts.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { ConsolidadoComponent } from './pages/consolidado/consolidado.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    PrincipalComponent,
    LoginComponent,
    ProductosComponent,
    ClientesComponent,
    ProveedoresComponent,
    VentasComponent,
    ReportesComponent,
    ConsolidadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [AuthService, 
    AuthGuard,
    CargarScriptsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
