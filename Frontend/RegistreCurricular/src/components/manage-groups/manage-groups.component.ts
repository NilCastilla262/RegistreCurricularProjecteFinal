import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import Swal from 'sweetalert2';
import { GroupsService } from '../../services/groups.service';
import { GroupModel }    from '../../models/groups/group.model';
import { getCurrentAcademicYear } from '../../utils/date-utils';


@Component({
  selector: 'app-manage-groups',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './manage-groups.component.html',
  styleUrl: './manage-groups.component.css'
})

export class ManageGroupsComponent implements OnInit {
  groups: GroupModel[] = [];
  originalNames: Record<string,string> = {};
  currentYear = '';

  constructor(private groupsService: GroupsService) {}

  ngOnInit(): void {
    this.currentYear = getCurrentAcademicYear();
    this.loadGroups();
  }

  private loadGroups(): void {
    this.groupsService.getGroupsByYear(this.currentYear).subscribe({
      next: arr => {
        this.groups = arr;
        this.originalNames = {};
        arr.forEach(g => this.originalNames[g.uuid] = g.name);
      },
      error: err => console.error('Error carregant grups:', err)
    });
  }

  saveName(g: GroupModel) {
    if (g.name === this.originalNames[g.uuid]) return;
    this.groupsService.updateGroupName(g.uuid, g.name).subscribe({
      next: updated => {
        this.originalNames[g.uuid] = updated.name;
        Swal.fire({
          icon: 'success',
          title: 'Nom actualitzat',
          toast: true,
          position: 'top-end',
          timer: 1500,
          showConfirmButton: false
        });
      },
      error: err => console.error('Error actualitzant nom:', err)
    });
  }

  confirmDelete(g: GroupModel) {
    Swal.fire({
      title: `Eliminar el grup “${g.name}”?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancel·lar',
      focusCancel: true,
      customClass: {
        popup: 'swal2-border-radius-lg',
        confirmButton: 'btn-swal-confirm',
        cancelButton:  'btn-swal-cancel'
      },
      buttonsStyling: false
    }).then(res => {
      if (res.isConfirmed) {
        this.groupsService.deleteGroup(g.uuid).subscribe({
          next: () => this.loadGroups(),
          error: err => console.error('Error eliminant grup:', err)
        });
      }
    });
  }
}
