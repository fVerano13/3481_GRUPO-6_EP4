import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/users';
import { CreateUserService } from 'src/app/services/create-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  createuserForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private _createUserService: CreateUserService){

      this.createuserForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required]
      })
  }

  crearUsuario(){
    
    const USER: Usuario = {
        username: this.createuserForm.get('username')?.value,
        email: this.createuserForm.get('email')?.value,
        password: this.createuserForm.get('password')?.value
    }

    Swal.fire({
      title: 'Creacion de Usuario',
      text: 'Desea crear el usuario?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
            this._createUserService.guardarUsuario(USER).subscribe(data => {
              this.router.navigate(['/'])
            })
      }
    })  
  }
}
