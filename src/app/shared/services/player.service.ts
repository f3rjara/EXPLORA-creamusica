import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import * as Tone from 'tone';
import { ObjectSound } from '@app/core/interfaces/object-sound.interface';
import { instrumentsData } from 'src/assets/sounds/instruments';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  instruments = {};

  constructor() {
    instrumentsData.forEach((instrumentData) => {
      this.instruments[instrumentData.instrument] = new Tone.Players({
        urls: instrumentData.files,
        fadeOut: '4n',
        baseUrl: `${environment.urlSounds}/${instrumentData.path}`,
      }).toDestination();
    });
  }

  resumePlayer() {
    if (Tone.context.state !== 'running') {
      Tone.context.resume();
    }
  }

  queueSounds(time: number, soundsActive: ObjectSound[]) {
    soundsActive.forEach((soundsActive) => {
      this.instruments[soundsActive.name]
        .player(soundsActive.note.toString())
        .start(time, 0, '16t');
    });
  }
}
