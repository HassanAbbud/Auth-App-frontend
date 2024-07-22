import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router)

  public myForm: FormGroup = this.fb.group({
    email: ["sirius@hotmail.com", [Validators.required, Validators.email]],//PRELOADED CREDENTIALS
    password: ["Admin123", [Validators.required, Validators.minLength(6)]],//FOR TESTING
  })

  login(){
    const {email, password} = this.myForm.value;

    this.authService.login(email, password)
    .subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (message) => {Swal.fire('Error', message, 'error')}
    })
  }
}
