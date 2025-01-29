import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, Observable } from 'rxjs';
import { ClientLoging } from '@core/interfaces/client-login.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginServerService {
  _clientLoging: ClientLoging;

  constructor(private _socket: Socket) {}

  logingServer(clientLoging: ClientLoging) {
    this._clientLoging = clientLoging;
    if (this._socket.ioSocket.connected) {
      this._socket.emit('logingServer', this._clientLoging);
      return this._socket.fromEvent<ClientLoging>('user_sigin').pipe(
        map((client: ClientLoging) => {
          this._clientLoging = client;
          this._clientLoging.socketOpen = true;
          this._clientLoging.loging = true;
          return this._clientLoging;
        })
      );
    }
    return new Observable<ClientLoging>((observer) => {
      this._clientLoging.socketOpen = false;
      this._clientLoging.loging = false;
      return observer.next(this._clientLoging);
    });
  }

  // saved clientLoging in localStorage
  saveClientLoging(clientLoging: ClientLoging) {
    localStorage.setItem('clientLoging', JSON.stringify(clientLoging));
  }

  // get clientLoging from localStorage
  getClientLoging(): ClientLoging {
    return JSON.parse(localStorage.getItem('clientLoging'));
  }

  // get language from localStorage of user loging
  getLanguage(): string {
    if( !localStorage.getItem('clientLoging') ) return 'spanish';
    return JSON.parse(localStorage.getItem('clientLoging')).language;
  }
}
