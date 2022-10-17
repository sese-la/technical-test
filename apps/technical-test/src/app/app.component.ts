import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppService } from './services/app.service';

@Component({
  selector: 'fortil-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // checkbox
  defaultData = [
    { id: 1, name: 'Délaminage', checked: false },
    { id: 2, name: 'Porosite', checked: false },
    { id: 3, name: 'Inclusion', checked: false },
  ];
  // erreur de la snackbar
  errorMessage =
    "Erreur. Le champ 'Nom agent' ne doit pas contenir de caractère numérique.";
  // validation de la snackbar
  validMessage = 'Le formulaire a bien été envoyé';
  // durée de la snackbar en seconde
  durationInSeconds = 3;
  // nom de l'agent
  nom = '';

  // commentaire de l'agent
  commentaire = '';
  // regex utilisé pour s'arssurer de la conformité du champ "Nom agent"
  regex = new RegExp('^([^0-9]*)$');
  date = new Date().toLocaleDateString();

  constructor(private snackBar: MatSnackBar, private appService: AppService) {}

  /**
   * méthode permettant de récuperer la valeur "name" de la checkbox à la place du boolean "checked"
   */
  get selectedOptions() {
    return this.defaultData.filter((def) => def.checked).map((def) => def.name);
  }

  /**
   * méthode permettant l'affichage de la snackbar
   * @param message
   * @param action
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  /**
   * méthode envoyant les données, du formulaire dès lors où l'utilisateur click sur le bouton "envoyer", au service appService
   * @param dataPost
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submit(dataPost: any) {
    // la variable récupère la valeur "name" de la checkbox et pas le boolean "checked"
    dataPost.default = this.selectedOptions;

    // condition vérifiant si le champ "nom Agent" contient des caractères numériques
    if (this.regex.test(dataPost.nom) === false) {
      this.openSnackBar(this.errorMessage, '');
    } else {
      try {
        // constante contenant la requête
        const rep = new HttpParams()
          .set('default', dataPost.default)
          .set('nomAgent', dataPost.nom)
          .set('commentaire', dataPost.commentaire)
          .set('date', this.date);
        // on appelle le service qui envoit les données
        this.appService.sendData(rep).subscribe();
        this.openSnackBar(this.validMessage, '');
      } catch {
        this.openSnackBar('Error', '');
      }
      // on refresh le formulaire
      this.refresh();
    }
  }

  /**
   * Méthode utilisé pour refresh le formulaire
   */
  refresh() {
    this.nom = '';
    this.commentaire = '';
    this.defaultData = [
      { id: 1, name: 'Délaminage', checked: false },
      { id: 2, name: 'Porosite', checked: false },
      { id: 3, name: 'Inclusion', checked: false },
    ];
  }
}
