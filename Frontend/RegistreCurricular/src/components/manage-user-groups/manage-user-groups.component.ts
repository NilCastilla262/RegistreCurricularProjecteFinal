import { Component, OnInit, Input } from '@angular/core';
import { UserGroupRelationService } from '../../services/user-group-relation.service';
import { GroupsService } from '../../services/groups.service';
import { GroupModel } from '../../models/groups/group.model';
import { getCurrentAcademicYear } from '../../utils/date-utils';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-user-groups',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-user-groups.component.html',
  styleUrl: './manage-user-groups.component.css'
})
export class ManageUserGroupsComponent implements OnInit {
  userUUID!: string;

  assigned: GroupModel[] = [];
  available: GroupModel[] = [];
  year = getCurrentAcademicYear();

  constructor(
    private route: ActivatedRoute,
    private relationSvc: UserGroupRelationService,
    private groupsSvc: GroupsService
  ) {}

  ngOnInit(): void {
    const uuidParam = this.route.snapshot.paramMap.get('uuid');
    if (!uuidParam) {
      throw new Error('No s’ha passat cap UUID d’usuari a la ruta');
    }
    this.userUUID = uuidParam;
    this.reloadAll();
  }

  private reloadAll() {
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
    const assignedIds = new Set(this.assigned.map(g => g.uuid));
    this.available = this.available.filter(g => !assignedIds.has(g.uuid));
  }

  add(group: GroupModel) {
    this.relationSvc
      .addUserToGroup(this.userUUID, group.uuid)
      .subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: `Grup "${group.name}" assignat`,
          timer: 1000,
          showConfirmButton: false
        });
        this.reloadAll();
      });
  }

  confirmRemove(group: GroupModel) {
    Swal.fire({
      title: `Estàs segur que vols treure el grup "${group.name}" de l'usuari?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancel·lar',
      customClass: {
        confirmButton: 'btn-swal-confirm',
        cancelButton: 'btn-swal-cancel'
      },
      buttonsStyling: false
    }).then(result => {
      if (result.isConfirmed) {
        this.relationSvc
          .removeUserFromGroup(this.userUUID, group.uuid)
          .subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: `Grup "${group.name}" eliminat`,
              timer: 1000,
              showConfirmButton: false
            });
            this.reloadAll();
          });
      }
    });
  }
}
