import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/users';
import { DataLoginService } from 'src/app/services/data-login.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private datalogin: DataLoginService){

      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      })
  }

  loginUser(){

    if(this.loginForm.invalid){
      return;
    }

    const USER: Usuario = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value
    }

    this.datalogin.loginUser(USER).subscribe(data => {
      this.router.navigate(['/principal']); 
    })
  }
}