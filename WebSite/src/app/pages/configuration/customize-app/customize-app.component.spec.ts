import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeAppComponent } from './customize-app.component';

describe('CustomizeAppComponent', () => {
  let component: CustomizeAppComponent;
  let fixture: ComponentFixture<CustomizeAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizeAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizeAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
