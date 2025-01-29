import { Injectable, OnDestroy } from '@angular/core';
import { ObjectSound } from '@app/core/interfaces/object-sound.interface';
import { Sequence, TransportTime } from 'tone';
import * as Tone from 'tone';
import { ObjectDetectedService } from './object-detected.service';
import { PlayerService } from './player.service';
import { ToneWithContext } from 'tone/build/esm/core/context/ToneWithContext';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SequenceService implements OnDestroy {
  subDivision = '4n';
  columns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  progressAnimation;
  sequencer;
  timeBar;
  timelineBar;
  timelineShow;
  timelineTime;
  sounds: ObjectSound[];
  getObjectsSubscribe: Subscription;
  callback = (time, value) => {
    let sounds: ObjectSound[] = this.sounds.filter(
      (sound) => sound.moment === value
    );
    this.player.queueSounds(time, sounds);
  };

  constructor(
    private objectDetectedSvc: ObjectDetectedService,
    private player: PlayerService
  ) {
    this.getObjectsSubscribe =
      this.objectDetectedSvc.getSoundsActive$.subscribe((data) => {
        this.sounds = data;
      });
  }
  ngOnDestroy(): void {
    this.getObjectsSubscribe.unsubscribe();
  }

  newSequence() {
    if (!this.sequencer) {
      this.timeBar = document.getElementById('time-bar');
      this.timelineBar = document.getElementById('timeline-bar');
      this.timelineShow = document.getElementById('timeline-show');
      this.timelineTime = document.getElementById('timeline-time');
      // Movimiento de lineas
      // Sequenciador
      this.sequencer = new Sequence(
        this.callback,
        this.columns,
        this.subDivision
      ).start(0);
    }
  }

  changeBPM(bpm = 75) {
    Tone.Transport.bpm.value = bpm;
  }
  start() {
    if (Tone.context.state !== 'closed') {
      Tone.context.resume();
    }
    if (!this.progressAnimation) {
      this.animation();
    }
    Tone.Transport.start();
    Tone.start();
  }

  stop() {
    if (this.sequencer) {
      Tone.Transport.stop();
      Tone.Transport.clear(this.sequencer);
      if (Tone.context.state !== 'running') {
        Tone.context.resume();
      }
      this.sequencer.stop();
      this.sequencer = undefined;
      this.clearAnimation();

      this.timeBar.style.left = `100px`;
      this.timelineBar.style.left = `95px`;
      this.timelineShow.style.width = `0%`;
      this.timelineTime.innerHTML = `${Tone.Transport.seconds.toFixed(2)}s`;
    }
  }

  pause() {
    if (this.sequencer) {
      Tone.Transport.pause();
      if (Tone.context.state !== 'running') {
        Tone.context.resume();
      }
    }
    this.clearAnimation();
  }

  clearAnimation() {
    clearInterval(this.progressAnimation);
    this.progressAnimation = undefined;
  }

  animation() {
    this.progressAnimation = setInterval(() => {
      const progress = this.sequencer.progress;
      if (progress >= 0.99) {
        Tone.Transport.seconds = 0;
      }
      this.timeBar.style.left = `calc(${progress * 95}% + 100px)`;
      this.timelineBar.style.left = `calc(${progress * 95}% + 95px)`;
      this.timelineShow.style.width = `calc(${progress * 95}%)`;
      this.timelineTime.innerHTML = `${Tone.Transport.seconds.toFixed(2)}s`;
    }, 4);
  }
}
