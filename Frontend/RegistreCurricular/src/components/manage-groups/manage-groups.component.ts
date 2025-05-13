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
  styleUrl: '../../styles/shared-table.css'
})

export class ManageGroupsComponent implements OnInit {
  courseOptions = ['1r', '2n', '3r', '4t', '5è', '6è'];
  groups: GroupModel[] = [];
  originalNames: Record<string,string> = {};
  currentYear = '';

  showForm = false;
  newName = '';
  newCourseName = '';

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
      error: err => {
        console.error('Error carregant grups:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No s’han pogut carregar els grups.',
          confirmButtonText: 'D’acord',
          customClass: { confirmButton: 'btn-swal-confirm' },
          buttonsStyling: false
        });
      }
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.newName = '';
      this.newCourseName = '';
    }
  }

  submitNewGroup() {
    const name = this.newName.trim();
    const course = this.newCourseName.trim();
    if (!name || name.length > 30 || !course || course.length > 20) {
      return;
    }

    this.groupsService.createGroup(name, course).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Grup creat',
          toast: true,
          position: 'top-end',
          timer: 1500,
          showConfirmButton: false
        });
        this.loadGroups();
        this.toggleForm();
      },
      error: err => {
        console.error('Error creant grup:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error creant grup',
          text: err.error?.message || 'S’ha produït un error inesperat.',
          confirmButtonText: 'D’acord',
          customClass: { confirmButton: 'btn-swal-confirm' },
          buttonsStyling: false
        });
      }
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
          timer: 1200,
          showConfirmButton: false
        });
      },
      error: err => {
        console.error('Error actualitzant nom:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error canviant nom',
          text: err.error?.message || 'No s’ha pogut actualitzar.',
          confirmButtonText: 'D’acord',
          customClass: { confirmButton: 'btn-swal-confirm' },
          buttonsStyling: false
        });
        g.name = this.originalNames[g.uuid];
      }
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
        confirmButton: 'btn-swal-confirm',
        cancelButton:  'btn-swal-cancel'
      },
      buttonsStyling: false
    }).then(res => {
      if (res.isConfirmed) {
        this.groupsService.deleteGroup(g.uuid).subscribe({
          next: () => {
            this.loadGroups();
            Swal.fire({
              icon: 'success',
              title: 'Eliminat',
              toast: true,
              position: 'top-end',
              timer: 1200,
              showConfirmButton: false
            });
          },
          error: err => {
            console.error('Error eliminant grup:', err);
            Swal.fire({
              icon: 'error',
              title: 'No s’ha pogut eliminar',
              text: err.error?.message || 'S’ha produït un error inesperat.',
              confirmButtonText: 'D’acord',
              customClass: { confirmButton: 'btn-swal-confirm' },
              buttonsStyling: false
            });
          }
        });
      }
    });
  }
}
