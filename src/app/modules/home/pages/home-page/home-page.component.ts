import { UserInteractionService } from './../../../../shared/services/user-interaction.service';
import { AfterContentInit, Component, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription, tap } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';

import { ClientLoging } from '@core/interfaces/client-login.interface';
import { ObjectDetectedService } from '@shared/services/object-detected.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnDestroy, AfterContentInit  {
  public languageSelect: string = 'spanish';
  public userSelect: string = 'Parue Explora | Medellín | Crea tu música';
  public clientLoging: ClientLoging = {
    name: this.userSelect,
    language: this.languageSelect,
    socketOpen: false,
    loging: false,
  };
  public objectsDetectedServer: Subscription;
  public userloginServer: Subscription;

  public response_experience: Subscription;
  public response_disconnect: Subscription;

  public status_experience: boolean = false;


  constructor(
    private router: Router,
    private objectDetectedService: ObjectDetectedService,
    private toastService: HotToastService,
    private userInteractionService: UserInteractionService,
    private _socket: Socket
  ) {}


  ngAfterContentInit(): void {
  this.response_disconnect =  this._socket
    .fromEvent('disconnect')
    .subscribe((response: { experience_connected: boolean }) => {
      this.toastService.warning( 'Experience is reloading, \n One moment please', { theme: 'snackbar', icon: '⚠️', position: 'top-right',  duration: 3000 } )
    });
  }


  ngOnDestroy(): void {
    this.objectsDetectedServer.unsubscribe();
    this.response_disconnect.unsubscribe();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(e: KeyboardEvent) {
    const keyPressed: string = e.key.toLowerCase();
    if( keyPressed === 'r' ) this.languageSelect = 'spanish';
    if( keyPressed === 't' ) this.languageSelect = 'english';

    if (keyPressed === 'r' || keyPressed === 't') {
      this.clientLoging.language = this.languageSelect;
      this.goGridPage();
    }
  }

  goGridPage() {
    
    if (this._socket.ioSocket.connected) {
      // show toastService with mensageShow of languageSelect
      this.toastService.warning( 'Connected with experience', { theme: 'snackbar', icon: '👋', position: 'top-right' } )
      this._socket.emit('interaction_client_app', this.clientLoging);
      this.objectsDetectedServer = this.objectDetectedService.socketObjectDetect()
        .subscribe( ( response: { response: string } ) => {
          this.userInteractionService.setShowTutorial(true)
          setTimeout( () => {
            this.router.navigate([`/musical-grid/${this.languageSelect}`]);
          }, 300);
        });
    }
    else {
      let mensageShow = this.languageSelect == 'spanish' ? 
          'No es posible conectar con el socketOpen del servidor. Revise su conexión' : 
          'It is not possible to connect to the socketOpen server. Check your connection';

      // show toastService with mensageShow of languageSelect
      this.toastService.warning( mensageShow, { theme: 'snackbar', icon: '⚠️', position: 'top-right' } )
    }
  };
}
