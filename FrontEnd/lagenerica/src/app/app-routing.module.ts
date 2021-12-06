import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ConsolidadoComponent } from './pages/consolidado/consolidado.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { VentasComponent } from './pages/ventas/ventas.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },{
    path:'home',
    component:PrincipalComponent,
    canActivate: [AuthGuard]
  },{
    path:'productos',
    component:ProductosComponent,
    canActivate: [AuthGuard]
  },{
    path:'clientes',
    component:ClientesComponent,
    canActivate: [AuthGuard]
  },{
    path:'proveedores',
    component:ProveedoresComponent,
    canActivate: [AuthGuard]
  },{
    path:'ventas',
    component:VentasComponent,
    canActivate: [AuthGuard]
  },{
    path:'reportes',
    component:ReportesComponent,
    canActivate: [AuthGuard]
  },{
    path:'consolidado',
    component:ConsolidadoComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
