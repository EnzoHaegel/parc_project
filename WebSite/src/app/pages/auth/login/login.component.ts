import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;

  public hide = true;

  public isSuccessful = false;

  public isSignUpFailed = false;

  public errorMessage = '';
  
  public socialUser: any = null;

  constructor(private _snackBar: MatSnackBar, private authService: AuthService, private fb: FormBuilder, private router: Router, private tokenStorage: TokenStorageService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  ngOnInit(): void {
  }

  public goToRegister(): void {
    this.router.navigateByUrl('/register');
  }

  public onSubmit(): void {
    const val = this.form.value;

    this.authService.login(val.username, val.password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        window.location.href = '/home';
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

  private reloadPage(): void {
    this.router.navigateByUrl('/home');
  }
}
