import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCenterComponent } from './change-center.component';

describe('ChangeCenterComponent', () => {
  let component: ChangeCenterComponent;
  let fixture: ComponentFixture<ChangeCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
