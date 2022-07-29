import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss']
})
export class ThemeSelectorComponent implements OnInit {

  public allThemes: string[] = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'pesto-green', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey'];
  public allThemesBy3: string[][] = [];

  constructor(
    private _snackBar: MatSnackBar,
    private applicationService: ApplicationService
  ) { }

  ngOnInit(): void {
    // Create an array of arrays of 3 themes
    for (let i = 0; i < this.allThemes.length; i += 3) {
      this.allThemesBy3.push(this.allThemes.slice(i, i + 3));
    }
  }

  public changeTheme(theme: string) {
    localStorage.setItem('theme', theme);
    this.applicationService.updateTheme(theme).subscribe({
      next: (_) => {
        location.reload();
      },
      error: (err) => {
        this._snackBar.open(err.error.error, 'Fermer', {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      }
    });
  }
}
