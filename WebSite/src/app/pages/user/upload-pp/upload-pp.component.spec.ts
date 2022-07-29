import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPpComponent } from './upload-pp.component';

describe('UploadPpComponent', () => {
  let component: UploadPpComponent;
  let fixture: ComponentFixture<UploadPpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadPpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
