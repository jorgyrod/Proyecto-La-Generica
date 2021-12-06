import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CargarScriptsService } from 'src/app/pages/cargar-scripts.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  isLoggedIn$: Observable<boolean> | undefined;

  constructor(private authService: AuthService, private _cargaScripts:CargarScriptsService) { 
    _cargaScripts.carga(["/animacion"]);
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onLogout() {
    this.authService.logout();
  }

}
