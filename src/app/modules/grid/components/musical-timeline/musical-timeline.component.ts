import { Component, OnInit, OnDestroy } from '@angular/core';
import { ObjectSound } from '@core/interfaces/object-sound.interface';
import { ObjectDetectedService } from '@shared/services/object-detected.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-musical-timeline',
  templateUrl: './musical-timeline.component.html',
  styleUrls: ['./musical-timeline.component.scss'],
})
export class MusicalTimelineComponent implements OnInit, OnDestroy {
  lineForm = {
    linesBase: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    0: [45, 48, 55, 43, 30, 20, 15, 13, 11, 10, 9, 8, 8, 8, 8, 8],
    1: [50, 60, 53, 50, 45, 40, 35, 30, 25, 20, 15, 10, 10, 10, 10, 8],
    2: [50, 45, 35, 25, 25, 30, 25, 15, 12, 12, 10, 10, 7, 8, 8, 8],
    3: [60, 60, 55, 50, 50, 35, 35, 30, 25, 20, 15, 10, 10, 10, 10, 8],
    4: [60, 55, 50, 40, 35, 35, 15, 13, 12, 10, 10, 10, 10, 10, 10, 8],
    5: [60, 60, 40, 40, 35, 33, 32, 30, 25, 20, 15, 13, 11, 10, 10, 10],
    6: [70, 50, 25, 25, 25, 25, 15, 12, 10, 10, 10, 10, 8, 8, 8, 8],
    7: [50, 60, 40, 35, 30, 25, 20, 15, 15, 10, 10, 10, 10, 8, 8, 8],
    8: [60, 55, 50, 45, 40, 35, 30, 25, 20, 20, 20, 15, 10, 9, 8, 8],
    9: [70, 50, 50, 50, 30, 25, 20, 15, 10, 10, 10, 10, 10, 10, 10, 10],
    10: [50, 60, 40, 35, 30, 25, 20, 15, 15, 15, 15, 15, 10, 10, 10, 10],
    11: [60, 60, 40, 40, 30, 30, 20, 20, 15, 15, 10, 10, 8, 8, 7, 7],
  };
  soundsActives;
  columns = new Array(16);
  seconds;
  objectSubscribe: Subscription;

  constructor(private objectDetectedSvc: ObjectDetectedService) {}

  ngOnInit(): void {
    this.soundsActives = new Array(16);

    this.objectSubscribe = this.objectDetectedSvc.getSoundsActive$.subscribe(
      (data) => {
        this.soundsActives = new Array(16);
        this.columns.fill(this.lineForm['linesBase']);
        data.forEach((sound: ObjectSound) => {
          if (this.soundsActives[sound.moment]) {
            this.soundsActives[sound.moment][0] += 0.2;
          } else {
            this.soundsActives[sound.moment] = [1, sound.note];
          }
        });
        this.drawWave();
      }
    );
  }

  ngOnDestroy(): void {
    this.objectSubscribe.unsubscribe();
  }

  drawWave() {
    this.soundsActives.forEach((sound, index) => {
      if (sound) {
        this.columns[index] = this.lineForm[sound[1]].map((x) => x * sound[0]);
      }
    });
  }
}
