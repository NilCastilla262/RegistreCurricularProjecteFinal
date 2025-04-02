import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSdaComponent } from './list-sda.component';

describe('ListSdaComponent', () => {
  let component: ListSdaComponent;
  let fixture: ComponentFixture<ListSdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSdaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
