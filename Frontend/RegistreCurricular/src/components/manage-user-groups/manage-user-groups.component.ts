import { Component, OnInit, Input } from '@angular/core';
import { UserGroupRelationService } from '../../services/user-group-relation.service';
import { GroupsService } from '../../services/groups.service';
import { GroupModel } from '../../models/groups/group.model';
import { getCurrentAcademicYear } from '../../utils/date-utils';

@Component({
  selector: 'app-manage-user-groups',
  standalone: true,
  imports: [],
  templateUrl: './manage-user-groups.component.html',
  styleUrl: './manage-user-groups.component.css'
})
export class ManageUserGroupsComponent implements OnInit {
  @Input() userUUID!: string;

  assigned: GroupModel[] = [];
  available: GroupModel[] = [];
  year = getCurrentAcademicYear();

  constructor(
    private relationSvc: UserGroupRelationService,
    private groupsSvc: GroupsService
  ) {}

  ngOnInit(): void {
    this.loadAssigned();
    this.loadAvailable();
  }

  private loadAssigned() {
    this.relationSvc
      .getGroupsByUser(this.userUUID)
      .subscribe(list => {
        this.assigned = list;
        this.filterAvailable();
      });
  }

  private loadAvailable() {
    this.groupsSvc
      .getGroupsByYear(this.year)
      .subscribe(list => {
        this.available = list;
        this.filterAvailable();
      });
  }

  private filterAvailable() {
    if (this.assigned.length && this.available.length) {
      const assignedIds = new Set(this.assigned.map(g => g.uuid));
      this.available = this.available.filter(g => !assignedIds.has(g.uuid));
    }
  }

  add(group: GroupModel) {
    this.relationSvc
      .addUserToGroup(this.userUUID, group.uuid)
      .subscribe(() => this.loadAssigned());
  }

  remove(group: GroupModel) {
    this.relationSvc
      .removeUserFromGroup(this.userUUID, group.uuid)
      .subscribe(() => this.loadAssigned());
  }
}
