import { Component, EventEmitter, Output } from '@angular/core';
import { ApplicationService } from './services/application.service';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WebSite';

  public darkOrLight: string = 'light';

  public theme: string = '';

  public className: string = 'dark-teal mat-app-background';

  darkThemeSelected: boolean = false;

  constructor(
    private applicationService: ApplicationService,
    private _overlayContainer: OverlayContainer
  ) {
    this.applicationService.getTheme().subscribe({
      next: (data: any) => {
        this.theme = data.theme;
        localStorage.setItem('theme', this.theme);
      }
    });
  }

  ngOnInit() {
    this.theme = localStorage.getItem('theme') || '';
    this.darkOrLight = localStorage.getItem('darkTheme') || '';
    if (this.darkOrLight === '') {
      this.darkOrLight = 'light-';
      localStorage.setItem('darkTheme', this.darkOrLight);
    }
    this.className = this.darkOrLight + this.theme + ' mat-app-background';
    this.changeTheme();
  }

  public applyTheme(darkThemeSelected : boolean) {
    this.darkThemeSelected = darkThemeSelected;
  }

  public slideDarkTheme(value: boolean) {
    this.darkThemeSelected = value;
    if (this.darkThemeSelected) {
      this.darkOrLight = 'dark-';
      localStorage.setItem('darkTheme', this.darkOrLight);
    } else {
      this.darkOrLight = 'light-';
      localStorage.setItem('darkTheme', this.darkOrLight);
    }
    this.className = this.darkOrLight + this.theme + ' mat-app-background';
    this.changeTheme();
  }

  public isDarkThemeSelected() {
    return this.darkOrLight === 'dark-';
  }

  public changeTheme(): void {
    // remove old theme class and add new theme class this.className
    const theme = '-'+this.className.split('-')[1].split(' ')[0];
    const overlayContainerClasses = this._overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes(theme));
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(this.className.split(' ')[0]);
  }
}
