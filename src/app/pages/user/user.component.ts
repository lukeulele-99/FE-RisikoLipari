import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../model/User';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GameModel } from '../../model/Game';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { GameService } from '../../services/game/game.service';



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
  errorMessage: string | null = null;
  currentUser: UserModel | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private gameService: GameService
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

  }

  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  exitGame() {
    this.authService.logout();
    this.router.navigate(['/user']);
  }



  ngOnInit(): void {
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


      const email = this.userForm.value.email;
      const existingUser = this.findUserByEmail(email);

      if (existingUser) {
        this.authService.login(existingUser);
      } else {
        const newUser: UserModel = {
          username: email
        };

        this.userService.addUser(newUser).subscribe({
          next: (response) => {
            this.authService.login(response);
            this.router.navigate(['/game']);
            console.log('User created ', response);
            this.userForm.reset();
          },
          error: (err) => {
            console.error("Error creating user ", err);
            this.errorMessage = "Errore nella creazione dell'utente. Riprova.";
          }
        });

      }
    }



  }

  createGame() {
    this.gameService.createGame().subscribe({
      next: (game) => {
        console.log('New game ', game);
        if(game && game.id) {
          this.router.navigate(['/game', game.id]);
        } else {
          console.error('Errore, id mancante');
        }
          //passare l'id del game 
      },
      error: (error) => {
        console.error('Error ', error);
      }
    })
  }

 

  
  findUserByEmail(email: string): UserModel | undefined {
    return this.users.find(user => user.username === email);
  }

}


