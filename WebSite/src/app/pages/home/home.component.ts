import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScriptsService } from 'src/app/services/scripts.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public stdout: string[] = [];
  public scriptList!: string[];
  public return_value: string = '';
  public isAdmin: boolean = false;

  constructor(
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private scriptsService: ScriptsService
  ) { }

  ngOnInit(): void {
    this.scriptsService.getScripts().subscribe({
      next: (data) => {
        this.scriptList = data.scripts;
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.checkIfUserAdmin();
  }

  public clearConsole() {
    this.stdout = [];
  }

  public executeScript(scriptName: string) {
    this.scriptsService.executeScript(scriptName).subscribe({
      next: (data) => {
        this.stdout = data.stdout.split('\n');
        this.stdout.unshift('\n');
        this.stdout.unshift('> execute ' + scriptName);
        this.return_value = (data.return_code != null ? data.return_code.toString() : 'null');
        this.stdout.push('\n');
        this.stdout.push('return value: ' + this.return_value);
        const classSnack = (this.return_value === '0' ? ['mat-toolbar', 'mat-primary'] : ['mat-toolbar', 'mat-warn']);
        this._snackBar.open(data.message, 'Fermer', {
          duration: 2000,
          panelClass: classSnack
        });
      },
      error: (err) => {
        console.log(err)
        this._snackBar.open(err.error.error, 'Fermer', {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      }
    });
  }

  private checkIfUserAdmin() {
    this.userService.isAdmin().subscribe({
      next: (data) => {
        this.isAdmin = data.role === 'admin' ? true : false;
      }
    });
  }
}
