import { Component } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-user',
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.usersUpdatedSubject.subscribe((user) => {
      console.log(user);
      this.users = user;
    })

    this.userService.getUsers().subscribe((response) => this.users = response.data);
  }
}
