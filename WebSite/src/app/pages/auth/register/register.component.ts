import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form!: FormGroup;

  public hide = true;

  public isSuccessful = false;

  public isSignUpFailed = false;

  public errorMessage = '';

  constructor(private _snackBar: MatSnackBar, private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  ngOnInit(): void {
  }

  public goToLogin(): void {
    this.router.navigateByUrl('/login');
  }

  public onSubmit(): void {
    const val = this.form.value;

    this.authService.register(val.username, val.email, val.password).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.goToLogin();
      },
      err => {
        this._snackBar.open(err.statusText, 'Fermer', {
          duration: 5000
        });
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
