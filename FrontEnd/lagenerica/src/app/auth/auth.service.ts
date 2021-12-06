import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthService {
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    constructor(
        private router: Router,
        private toastr: ToastrService
    ) { }

    login(user: User) {
        if (user.userName === 'admininicial' && user.password === 'admin123456') {
            this.loggedIn.next(true);
            this.router.navigate(['/home']);
        }
        else {
            this.fallo();
            console.log("Usuario o contraseña incorreta");
        }
    }

    fallo(){
        this.toastr.error('<b>Usuario o Contraseña Incorrecta!</b>', '', {
            disableTimeOut: false,
            enableHtml: true,
            closeButton: true,
            positionClass: 'toast-' + 'top' + '-' + 'right'
        });
    }

    logout() {
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
    }
}