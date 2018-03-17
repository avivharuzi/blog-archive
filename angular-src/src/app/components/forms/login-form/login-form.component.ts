import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validator } from '../../../models/validator.model';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ValidationService } from '../../../services/validation/validation.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  public loginForm: FormGroup;
  public loading: boolean;
  public messageForm: any;
  public typeMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    public validationService: ValidationService
  ) {
    this.loading = false;
    this.messageForm = null;
    this.typeMessage = null;
  }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm(): void {
    const username = new FormControl('', [
      Validator.required('Username')
    ]);

    const password = new FormControl('', [
      Validator.required('Password')
    ]);

    this.loginForm = new FormGroup({
      username,
      password
    });
  }

  setLoginForm(): void {
    if (this.loginForm.valid) {
      this.loading = true;

      const user: User = new User(
        this.loginForm.get('username').value,
        this.loginForm.get('password').value
      );

      this.authService.login(user).subscribe((res: any) => {
        if (res) {
          this.router.navigate(['/admin']);
          this.loading = false;
        }
      }, (err) => {
        this.typeMessage = 'danger';
        this.messageForm = err.errors;
        this.loading = false;
      });
    }
  }

  getStatus(name: string): any {
    return this.validationService.statusClass(this.loginForm.get(name));
  }
}
