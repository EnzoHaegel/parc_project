import { Component, Inject, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/IUser';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  public BASE_URL = "http://localhost:4000/api"

  public panelOpenState = false;

  public users: IUser[] = [];

  public usersPrinted: IUser[] = [];

  public form!: FormGroup;

  constructor(
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.form = this.fb.group({
      search: [''],
    });
  }

  ngOnInit(): void {
    this.getUSers();
  }

  private getUSers(): void {
    this.userService.getAllUser().subscribe({
      next: (data) => {
        this.users = data;
        this.usersPrinted = data;
      }
    });
  }

  public onSubmit(): void {
    const val = this.form.value;

    this.usersPrinted = this.searchByUsername(val.search);

    if (this.usersPrinted.length === 0)
      this.usersPrinted = this.searchByEmail(val.search);
    if (this.usersPrinted.length === 0)
      this.usersPrinted = this.searchByRole(val.search);
  }

  public searchByUsername(username: string) {
    return this.users.filter(user => user.username.includes(username));
  }
  
  public searchByEmail(email: string) {
    return this.users.filter(user => user.email.includes(email));
  }
  
  public searchByRole(role: string) {
    return this.users.filter(user => user.role.includes(role));
  }

  public deleteUser(username: string) {
    this.openDialog(username);
  }

  private deleteConfirmedUser(username: string) {
    this.userService.deleteUser(username).subscribe({
      next: (_) => {
        this.getUSers();
        this._snackBar.open('L\'utilisateur: ' + username + ' a bien été supprimer !', 'Fermer', {
          duration: 2000
        });
      },
      error: (err) => {
        this._snackBar.open(err.error.message, 'Fermer', {
          duration: 3000,
          panelClass: ['mat-warn']
        });
      }
    });
  }

  public openDialog(username: any): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '350px',
      data: username,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteConfirmedUser(username);
      }
    });
  }

  public reset() {
    this.form.reset();
    this.usersPrinted = this.users;
  }
}
