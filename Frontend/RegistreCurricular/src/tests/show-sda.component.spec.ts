import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSdaComponent } from './show-sda.component';

describe('ShowSdaComponent', () => {
  let component: ShowSdaComponent;
  let fixture: ComponentFixture<ShowSdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowSdaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
