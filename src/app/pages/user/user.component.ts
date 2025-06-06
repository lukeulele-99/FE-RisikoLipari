import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../model/User';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { UserDTO } from '../../model/UserDTO';


@Component({
  standalone: true,
  selector: 'app-user',
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  users: UserModel[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.usersUpdatedSubject.subscribe((usersDto) => {
      this.users = usersDto ? usersDto.map((dto: UserDTO) => this.mapUserDtoToUserModel(dto)) : [];
    });

    this.userService.getUsers().subscribe({
      next: (response) => {
        console.log('response', response)
        if (Array.isArray(response) && response.length > 0) {
          this.users = response.map(dto => this.mapUserDtoToUserModel(dto));
        } else {
          this.users = [];
        }
      },
      error: (error) => {
        console.error('error: ', error)
        this.users = [];
      }
    });
  }

  private mapUserDtoToUserModel(dto: UserDTO): UserModel {
    return {
      id: dto.userId,
      username: dto.username
    };
  }
}
