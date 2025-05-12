import { Component, OnInit } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { UsersService }   from '../../services/users.service';
import { UserCenterRelationService } from '../../services/user-center-relation.service';
import { UserModel }      from '../../models/users/user.model';

@Component({
  selector: 'app-manage-teachers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-teachers.component.html',
  styleUrl: './manage-teachers.component.css'
})
export class ManageTeachersComponent implements OnInit {
  teachers: UserModel[] = [];
  originalRoles: Record<string, number> = {};

  showForm = false;
  newEmail = '';
  newRole: number | null = null;

  constructor(
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
      error: err  => console.error('Error carregant professors:', err)
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
    if (role === 2) {
      return 'Administrador de centre';
    }
    return 'Professor';
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
      error: err => console.error('Error afegint professor:', err)
    });
  }

  saveRole(u: UserModel) {
    if (u.role === this.originalRoles[u.email]) return;
    this.relService.updateRole(u.email, u.role).subscribe({
      next: () => this.originalRoles[u.email] = u.role,
      error: err => console.error('Error actualitzant rol:', err)
    });
  }

  confirmDelete(u: UserModel) {
    const name = u.name || u.email;
    if (!window.confirm(`Estàs segur que vols treure el professor “${name}” del centre?`)) {
      return;
    }
    this.relService.deleteRelation(u.email).subscribe({
      next: () => this.loadTeachers(),
      error: err => console.error('Error eliminant relació:', err)
    });
  }
}
