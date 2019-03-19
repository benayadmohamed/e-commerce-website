import {Injectable} from '@angular/core';
import {SnotifyService} from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class ErrorsMessagesService {

  constructor() {
  }

  public getErrorMessageEmail(email) {
    return email.hasError('required') ? 'You must enter a value' :
      email.hasError('email') ? 'Not a valid email' :
        email.hasError('notfound') ? 'jma3' :
          '';
  }

  public getErrorMessagePrix(prix) {
    return prix.hasError('required') ? 'You must enter a value' :
      prix.hasError('pattern') ? 'example : 12.25' :
        '';
  }

  public getErrorMessageStock(prix) {
    return prix.hasError('required') ? 'You must enter a value' :
      prix.hasError('pattern') ? 'Number' :
        '';
  }

  public getErrorMessagePassword(password) {
    return password.hasError('required') ? 'You must enter a value' :
      password.hasError('minlength') ? 'Name must be at least 8 characters long.' : '';
  }

  public getErrorMessageName(name) {
    return name.hasError('required') ? 'You must enter a value' :
      name.hasError('minlength') ? 'Name must be at least 5 characters long.' : '';
  }

  public getErrorMessageConfirm(confirmpassword) {
    return confirmpassword.hasError('required') ? 'You must enter a value' :
      confirmpassword.hasError('confirm') ? 'Two passwords that you enter is inconsistent!' :
        '';
  }

}
