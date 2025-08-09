import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BradenFormComponent } from './braden-form.component';

describe('BradenFormComponent', () => {
  let component: BradenFormComponent;
  let fixture: ComponentFixture<BradenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BradenFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BradenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
