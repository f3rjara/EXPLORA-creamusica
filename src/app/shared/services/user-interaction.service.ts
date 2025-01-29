import { Injectable } from '@angular/core';
import { ChangeScaleService } from './change-scale.service';
import { HotToastService } from '@ngneat/hot-toast';
import { ObjectDetectedService } from './object-detected.service';
import { Router } from '@angular/router';
import { LoginServerService } from './login-server.service';
import { SequenceService } from './sequence.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserInteractionService {
  public languageSelect: string = this.loginServerService.getLanguage();
  private showTutorial: boolean = true;
  private showTutorial$ = new BehaviorSubject<boolean>(this.showTutorial);

  predefinedAction = {
    r: () => {
      this.sequenceSvc.newSequence();
      this.sequenceSvc.start();
    },
    t: () => {
      this.sequenceSvc.pause();
    },
    s: () => {
      this.sequenceSvc.stop();
    },
    d: () => {
      this.restartExperience();
    },
    q: () => {
      this.changeScaleSvc.setMusicalScale('cromatica');
      const mensage = {
        spanish: 'Escala cromática',
        english: 'Chromatic scale',
      };
      this.showToast(mensage[this.languageSelect], '🎚️');
    },
    w: () => {
      this.changeScaleSvc.setMusicalScale('mayor');
      const mensage = { spanish: 'Escala mayor', english: 'Major scale' };
      this.showToast(mensage[this.languageSelect], '🎚️');
    },
    e: () => {
      this.changeScaleSvc.setMusicalScale('pentatonica');
      const mensage = {
        spanish: 'Escala pentatónica',
        english: 'Pentatonic scale',
      };
      this.showToast(mensage[this.languageSelect], '🎚️');
    },
    c: () => {
      // get showTutorial status
      this.showTutorial = !this.showTutorial;
      this.showTutorial$.next(this.showTutorial);
    },
    y: () => {
      let bpm = 75;
      this.sequenceSvc.changeBPM(bpm);
      this.showToast(`Adagio - BPM ${bpm}`, '🎚️');
    },
    u: () => {
      let bpm = 85;
      this.sequenceSvc.changeBPM(bpm);
      this.showToast(`Moderato - BPM ${bpm}`, '🎚️');
    },
    i: () => {
      let bpm = 95;
      this.sequenceSvc.changeBPM(bpm);
      this.showToast(`Andante moderato - BPM ${bpm}`, '🎚️');
    },
    o: () => {
      let bpm = 115;
      this.sequenceSvc.changeBPM(bpm);
      this.showToast(`Allegro - BPM ${bpm}`, '🎚️');
    },
    p: () => {
      let bpm = 130;
      this.sequenceSvc.changeBPM(bpm);
      this.showToast(`Adagio - BPM ${bpm}`, '🎚️');
    },
  };

  constructor(
    private changeScaleSvc: ChangeScaleService,
    private sequenceSvc: SequenceService,
    private toastSvc: HotToastService,
    private objectDetectedService: ObjectDetectedService,
    private router: Router,
    private loginServerService: LoginServerService
  ) {}

  userAction(key: string) {
    if (this.predefinedAction[key]) {
      this.predefinedAction[key]();
    }
  }

  showToast(message, icon) {
    this.toastSvc.info(message, {
      theme: 'snackbar',
      icon: icon,
      position: 'top-right',
      duration: 2000,
    });
  }

  restartExperience() {
    this.sequenceSvc.stop();
    this.objectDetectedService
      .stopSocketObjectDetect()
      .subscribe((response) => {
        /* console.log('response of socket:: ', response); */
      });
    this.router.navigate(['/']);
  }

  get getShowTutorial$(): Observable<boolean> {
    return this.showTutorial$;
  }

  setShowTutorial(showTutorial: boolean) {
    this.showTutorial = showTutorial;
    this.showTutorial$.next(this.showTutorial);
  }
}
