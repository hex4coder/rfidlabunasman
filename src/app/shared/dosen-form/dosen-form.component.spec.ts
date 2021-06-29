import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DosenFormComponent } from './dosen-form.component';

describe('DosenFormComponent', () => {
  let component: DosenFormComponent;
  let fixture: ComponentFixture<DosenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DosenFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DosenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
