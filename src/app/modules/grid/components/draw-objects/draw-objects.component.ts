import { map, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { configInitCalibration } from '@app/core/interfaces/calibrated.interface';
import { ObjectDetector } from '@app/core/interfaces/object-detector.interface';
import { CalibratedService } from '@app/shared/services/calibrated.service';
import { ObjectDetectedService } from '@shared/services/object-detected.service';

@Component({
  selector: 'app-draw-objects',
  templateUrl: './draw-objects.component.html',
  styleUrls: ['./draw-objects.component.scss'],
})
export class DrawObjectsComponent implements OnInit, OnDestroy {
  public objectsInstrumentsDraw: ObjectDetector[] = [];
  public configInitCalibration: configInitCalibration;
  private objectDetected$: Subscription;
  calibrateSubscribe: Subscription;

  constructor(
    private objectDetectSvc: ObjectDetectedService,
    private calibratedService: CalibratedService
  ) {
    this.listenerObjectsDetected();
    this.calibrateSubscribe =
      this.calibratedService.getConfigInitCalibration$.subscribe(
        (configInit) => {
          this.configInitCalibration = configInit;
        }
      );
  }

  ngOnDestroy(): void {
    this.objectDetected$.unsubscribe();
    this.calibrateSubscribe.unsubscribe();
  }

  ngOnInit(): void {}

  listenerObjectsDetected() {
    this.objectDetected$ = this.objectDetectSvc.getObjectsDetected$.subscribe(
      (objectsDetectedInstruments: ObjectDetector[]) => {
        this.objectsInstrumentsDraw = objectsDetectedInstruments;
      }
    );
  }
}
