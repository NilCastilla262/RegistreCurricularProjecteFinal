import { Component, OnInit } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { UsersService }   from '../../services/users.service';
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

  showForm = false;
  newEmail = '';
  newRole: number | null = null;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  private loadTeachers(): void {
    this.usersService.getUsersByCenter().subscribe({
      next: users => this.teachers = users,
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

    this.usersService
      .addUserToCenter(this.newEmail, this.newRole)
      .subscribe({
        next: () => {
          this.loadTeachers();
          this.toggleForm();
        },
        error: err => console.error('Error afegint professor:', err)
      });
  }
}
