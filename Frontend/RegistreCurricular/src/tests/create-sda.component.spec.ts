import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSdaComponent } from './create-sda.component';

describe('CreateSdaComponent', () => {
  let component: CreateSdaComponent;
  let fixture: ComponentFixture<CreateSdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSdaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
