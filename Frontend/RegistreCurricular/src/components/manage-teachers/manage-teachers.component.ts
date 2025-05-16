import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { UserCenterRelationService } from '../../services/user-center-relation.service';
import { UserModel } from '../../models/users/user.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-teachers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-teachers.component.html',
  styleUrl: '../../styles/shared-table.css'
})
export class ManageTeachersComponent implements OnInit {
  teachers: UserModel[] = [];
  originalRoles: Record<string, number> = {};

  showForm = false;
  newEmail = '';
  newRole: number | null = null;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private relService: UserCenterRelationService
  ) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  private loadTeachers(): void {
    this.usersService.getUsersByCenter().subscribe({
      next: users => {
        this.teachers = users;
        this.originalRoles = {};
        users.forEach(u => this.originalRoles[u.email] = u.role);
      },
      error: err => {
        console.error('Error carregant professors:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No s’han pogut carregar els professors.',
          confirmButtonText: 'D’acord',
          customClass: {
            confirmButton: 'btn-swal-confirm'
          },
          buttonsStyling: false
        });
      }
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.newEmail = '';
      this.newRole  = null;
    }
  }

  getRoleLabel(role: number): string {
    return role === 2
      ? 'Administrador de centre'
      : 'Professor';
  }

  submitNewTeacher() {
    if (!this.newEmail || this.newEmail.length > 50 || this.newRole == null) {
      return;
    }
    this.relService.addUserToCenter(this.newEmail, this.newRole).subscribe({
      next: () => {
        this.loadTeachers();
        this.toggleForm();
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Error afegint professor',
          text: err.error?.message || 'S’ha produït un error inesperat.',
          confirmButtonText: 'D’acord',
          customClass: { confirmButton: 'btn-swal-confirm' },
          buttonsStyling: false
        });
      }
    });
  }

  saveRole(u: UserModel) {
    if (u.role === this.originalRoles[u.email]) return;
    this.relService.updateRole(u.email, u.role).subscribe({
      next: () => {
        this.originalRoles[u.email] = u.role;
        Swal.fire({
          icon: 'success',
          title: 'Rol actualitzat',
          timer: 2500,
          showConfirmButton: false
        });
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Error canviant el rol',
          text: err.error?.message || 'No s’ha pogut actualitzar el rol.',
          confirmButtonText: 'D’acord',
          customClass: { confirmButton: 'btn-swal-confirm' },
          buttonsStyling: false
        });
        u.role = this.originalRoles[u.email];
      }
    });
  }

  confirmDelete(u: UserModel) {
    Swal.fire({
      title: `Treure “${u.name || u.email}” del centre?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancel·lar',
      focusCancel: true,
      customClass: {
        confirmButton: 'btn-swal-confirm',
        cancelButton: 'btn-swal-cancel'
      },
      buttonsStyling: false
    }).then(result => {
      if (result.isConfirmed) {
        this.relService.deleteRelation(u.email).subscribe({
          next: () => {
            this.loadTeachers();
            Swal.fire({
              icon: 'success',
              title: 'Eliminat',
              timer: 2500,
              showConfirmButton: false
            });
          },
          error: err => {
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

  manageGroups(u: UserModel) {
    this.router.navigate(['/manage-user-groups', u.uuid]);
  }
}
