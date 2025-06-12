import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../model/User';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GameModel } from '../../model/Game';
import { GameService } from '../../services/game/game.service';


@Component({
  standalone: true,
  selector: 'app-user',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
exitGame() {
throw new Error('Method not implemented.');
}
currentUser: any;
isUserLoggedIn(): any {
throw new Error('Method not implemented.');
}
  
  users: UserModel[] = [];
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private gameService: GameService) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (response) => {
        console.log('response', response);
        // ✅ Controlla se la response è di successo e contiene dati
        if (response.success && response.data && Array.isArray(response.data) && response.data.length > 0) {
          this.users = response.data; // ✅ Assegna solo i dati dell'array
        } else {
          this.users = [];
          // Opzionale: gestisci l'errore se response.success è false
          if (!response.success) {
            console.error('Errore dal server:', response.error);
          }
        }
      },
      error: (error) => {
        console.error('Errore HTTP: ', error);
        this.users = [];
      }
    });
  }

  createGame() {
    this.gameService.createGame();
  }

  addUser(): void {
    if (this.userForm.valid) {
      const newUser: UserModel = {
        username: this.userForm.value.email
      };

      this.userService.addUser(newUser).subscribe({
        next: (response) => {
          console.log('User created response:', response);
          // ✅ Controlla se la creazione è andata a buon fine
          if (response.success) {
            console.log('User created successfully');
            this.userForm.reset();
            // ✅ Ricarica gli utenti per mostrare l'aggiornamento
            this.loadUsers();
          } else {
            console.error('Errore nella creazione utente:', response.error);
          }
        },
        error: (err) => {
          console.error("Errore HTTP nella creazione utente:", err);
        }
      });
    } else {
      console.warn('Form non valido!');
    }
  }

  /*createGame(): void {
    const newGame: GameModel = {
      id: 0,
      score: 0,
      status: 'new',
      id_user: this.users.length > 0 ? this.users[0] : { username: '' }
    };

    this.userService.createGame(newGame).subscribe({
      next: (response) => {
        console.log('Game created response:', response);
        // ✅ Controlla se la creazione è andata a buon fine
        if (response.success) {
          console.log('Game created successfully:', response.data);
        } else {
          console.error('Errore nella creazione del gioco:', response.error);
        }
      },
      error: (error) => {
        console.error('Errore HTTP nella creazione del gioco:', error);
      }
    });
  }*/

  // ✅ Metodo helper per ricaricare gli utenti
  private loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (response) => {
        if (response.success && response.data && Array.isArray(response.data)) {
          this.users = response.data;
        } else {
          this.users = [];
        }
      },
      error: (error) => {
        console.error('Errore nel caricamento utenti:', error);
        this.users = [];
      }
    });
  }
}