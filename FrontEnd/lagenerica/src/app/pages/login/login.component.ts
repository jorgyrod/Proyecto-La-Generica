import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    userName : new FormControl(''),
    password : new FormControl('')
  });

  private formSubmitAttempt: boolean = false;

  constructor(
    private fb : FormBuilder,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName : ['',Validators.required],
      password : ['',Validators.required]
    });
  }

  onSubmit(){
    if(this.form.valid){
      this.authService.login(this.form.value);
    }
    this.formSubmitAttempt = true;
  }
}
