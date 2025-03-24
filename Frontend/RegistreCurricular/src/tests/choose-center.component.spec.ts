import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCenterComponent } from './choose-center.component';

describe('ChooseCenterComponent', () => {
  let component: ChooseCenterComponent;
  let fixture: ComponentFixture<ChooseCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
