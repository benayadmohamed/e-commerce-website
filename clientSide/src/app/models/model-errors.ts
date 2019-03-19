import {ErrorsMessagesService} from '../services/errors-messages.service';
import {FormControl} from '@angular/forms';

export class ModelErrors {
  fName = null;
  lName = null;
  phone = null;
  adresse = null;
  infoC = null;
  region = null;
  ville = null;
  prix = null;
  stock = null;
  email = null;
  password = null;
  password2 = null;
  name = null;
  password_confirmation = null;
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.password.value) {
      return {confirm: true, error: true};
    }
  };

  constructor(private erreursMessagesService: ErrorsMessagesService) {
  }

  public getErrorMessageEmail() {
    return this.erreursMessagesService.getErrorMessageEmail(this.email);
  }

  public getErrorMessagePrix() {
    return this.erreursMessagesService.getErrorMessagePrix(this.prix);
  }

  public getErrorMessageStock() {
    return this.erreursMessagesService.getErrorMessageStock(this.stock);
  }

  public getErrorMessagePassword() {
    return this.erreursMessagesService.getErrorMessagePassword(this.password);
  }


  public getErrorMessageConfirm() {
    return this.erreursMessagesService.getErrorMessageConfirm(this.password_confirmation);
  }

  public getErrorMessageName() {
    return this.erreursMessagesService.getErrorMessageName(this.name);
  }

  public getErrorMessageFName() {
    return this.erreursMessagesService.getErrorMessageName(this.fName);
  }

  public getErrorMessageLName() {
    return this.erreursMessagesService.getErrorMessageName(this.lName);
  }

  public getErrorMessageAdresse() {
    return this.erreursMessagesService.getErrorMessageName(this.adresse);
  }

  public getErrorMessageRegion() {
    return this.erreursMessagesService.getErrorMessageName(this.region);
  }

  public getErrorMessageVille() {
    return this.erreursMessagesService.getErrorMessageName(this.ville);
  }

  public getErrorMessagePhone() {
    return this.erreursMessagesService.getErrorMessageName(this.phone);
  }

  public getErrorMessageInfoC() {
    return this.erreursMessagesService.getErrorMessageName(this.infoC);
  }
}
