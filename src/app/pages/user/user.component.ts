import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../model/User';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GameModel } from '../../model/Game';


@Component({
  standalone: true,
  selector: 'app-user',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  users: UserModel[] = [];
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) { 
    this.userForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]]
    });

  }

  

  ngOnInit(): void {
    //this.userService.usersUpdatedSubject.subscribe((usersDto) => {
      //this.users = usersDto ? usersDto.map((dto: UserDTO) => this.mapUserDtoToUserModel(dto)) : [];
    //});

    this.userService.getUsers().subscribe({
      next: (response) => {
        console.log('response', response)
        if (Array.isArray(response) && response.length > 0) {
          this.users = response;
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

 


  addUser(): void {
    if (this.userForm.valid) {
      const newUser: UserModel = {
        
        username: this.userForm.value.email
      };

      this.userService.addUser(newUser).subscribe({
        next: (response) => {
          console.log('User created ', response);
          this.userForm.reset();
        },
        error: (err) => {
          console.error("Error creating user ", err);
        }
      });
    } else {
      console.warn('Form non valido!');
    }
  }

  createGame(): void {
    const newGame: GameModel = {
      id: 0,
      score: 0,
      status: '',
      id_user: this.users.length > 0 ? this.users[0] : { username: '', }
    };

    this.userService.createGame(newGame).subscribe({
      next: (response) => {
        console.log('Game created ', response);
      },
      error: (error) => {
        console.error('Error ', error);
      }
    });
  }

}


