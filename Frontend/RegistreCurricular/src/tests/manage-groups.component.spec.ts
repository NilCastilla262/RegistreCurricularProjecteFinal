import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageGroupsComponent } from '../components/manage-groups/manage-groups.component';



describe('ManageGroupsComponent', () => {
  let component: ManageGroupsComponent;
  let fixture: ComponentFixture<ManageGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageGroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
