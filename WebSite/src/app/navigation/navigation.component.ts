import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';
import { ApplicationService } from '../services/application.service';
import { BooleanInput } from '@angular/cdk/coercion';
import { MatDialog } from '@angular/material/dialog';
import { UploadPpComponent } from '../pages/user/upload-pp/upload-pp.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  @Output()
  public darkThemeSelected = new EventEmitter<boolean>();

  @Input()
  public darkMode!: BooleanInput;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  public user: any;

  public isAdmin: boolean = false;

  public myLogo: string = 'http://localhost:4000/api/application/logo';

  public profilePictureURL!: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  // get user infos on init
  ngOnInit() {
    this.user = this.tokenStorage.getUser();
    this.checkIfUserAdmin();
    this.profilePictureURL = "http://localhost:4000/api/user/profile_picture/"+this!.user.username;
  }

  private checkIfUserAdmin() {
    this.userService.isAdmin().subscribe({
      next: (data) => {
        this.isAdmin = data.role === 'admin' ? true : false;
      }
    });
  }

  public isLogged() {
    return Object.keys(this.tokenStorage.getUser()).length != 0;
  }

  public logout() {
    this.tokenStorage.signOut();
    // reload page to refresh token
    window.location.reload();
  }

  public getUsernameFirstLetter() {
    this.user = this.tokenStorage.getUser();
    return this.user.username.charAt(0).toUpperCase();
  }

  public toggleDarkMode(event: { checked: any; }) {
    this.darkThemeSelected.emit(event.checked);
  }

  public openDialog(): void {
    const dialogWidth = window.innerWidth < 600 ? 'calc(100% - 20px)' : 'calc(70% - 20px)';
    this.dialog.open(UploadPpComponent, {
      width: dialogWidth,
      maxWidth: '100vw'
    });
  }
}
