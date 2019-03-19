import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class CommandeNotificationService {


  constructor(private socket: Socket) {
  }

  sendMessage(msg: string) {
    this.socket.emit('CommandeNotification', msg);
  }

  /* getMessage() {
     return this.socket
       .fromEvent('CommandeNotification')
       .map(data => data.msg);
   }*/

  getOnCN() {
     this.socket.on('CommandeNotification', function (msg) {
      console.log(msg);
    });
  }
}
