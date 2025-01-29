import {
  Component,
  HostListener,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';

import { NotesScalesInterface } from '@core/interfaces/notes-scales.interface';
import { ObjectDetector } from '@core/interfaces/object-detector.interface';
import { ObjectSound } from '@core/interfaces/object-sound.interface';
import { ObjectDetectedService } from '@shared/services/object-detected.service';
import { ChangeScaleService } from '@shared/services/change-scale.service';
import { UserInteractionService } from '@shared/services/user-interaction.service';
import { CalibratedService } from '@app/shared/services/calibrated.service';
import { configInitCalibration } from '@app/core/interfaces/calibrated.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grid-page',
  templateUrl: './grid-page.component.html',
  styleUrls: ['./grid-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GridPageComponent implements OnInit, AfterViewInit, OnDestroy {
  // add one for show notes in left screen
  public columnsShow: number = 16;
  public rowsShow: number = 12;
  public gridShow: number[] = new Array(this.columnsShow * this.rowsShow);
  public cells: any[];

  public selectedScale: NotesScalesInterface =
    this.changeScale._musicalScales.cromatica;

  public objectsDetected: ObjectDetector[] = [];
  public objectSoundActive: ObjectSound[] = [];

  public factorXresolution: number = 1;
  public factorYresolution: number = 1;

  public isShowTutorial: Boolean;

  public configInitCalibration: configInitCalibration;

  userInteractionSubscribe: Subscription;
  calibrateSubscribe: Subscription;
  objectDetectSubscribe: Subscription;
  getObjectsSubscribe: Subscription;
  changeScaleSubscribe: Subscription;

  constructor(
    private objectDetectService: ObjectDetectedService,
    private userInteraction: UserInteractionService,
    private changeScale: ChangeScaleService,
    private calibrationService: CalibratedService
  ) {
    this.cells = new Array(
      this.selectedScale.rows * this.selectedScale.columns
    );
    this.userInteractionSubscribe =
      this.userInteraction.getShowTutorial$.subscribe((show) => {
        this.isShowTutorial = show;
      });
    this.calibrateSubscribe =
      this.calibrationService.getConfigInitCalibration$.subscribe(
        (configInit) => {
          this.configInitCalibration = configInit;
        }
      );
  }

  ngOnDestroy(): void {
    // liberate memory
    this.objectsDetected = [];
    // this.userInteractionSubscribe.unsubscribe();
    this.calibrateSubscribe.unsubscribe();
    this.objectDetectSubscribe.unsubscribe();
    this.getObjectsSubscribe.unsubscribe();
    this.changeScaleSubscribe.unsubscribe();
  }

  ngOnInit(): void {
    this.listenerChangeScale();
    this.listenerObjectsDetected();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getCellsScale();
    }, 400);
  }

  listenerObjectsDetected() {
    this.objectDetectSubscribe = this.objectDetectService
      .socketEmitObjectDetect()
      .subscribe({
        next: (objects: ObjectDetector[]) => {
          // filter objects with class is calibrated
          const objectsCalibrated = objects.filter(
            (object) => object.name === 'calibrated'
          );
          const objectsIntruments = objects.filter(
            (object) => object.name !== 'calibrated'
          );

          this.objectDetectService.setObjectsDetected(objectsIntruments);
          this.objectDetectService.setObjectsCalibration(objectsCalibrated);
          this.calibrationService.initCalibrated(objectsCalibrated);
        },
      });
    this.getObjectsSubscribe =
      this.objectDetectService.getObjectsDetected$.subscribe({
        next: (objectsIntruments: ObjectDetector[]) => {
          this.objectsDetected = objectsIntruments;
          this.getCellsScale();
        },
      });
  }

  listenerChangeScale() {
    this.changeScaleSubscribe = this.changeScale.getMusicalScale$.subscribe(
      (scale) => {
        this.selectedScale = scale;
        this.cells = new Array(
          this.selectedScale.rows * this.selectedScale.columns
        );
        this.removeCellActiveClass();
        setTimeout(() => {
          this.getCellsScale();
        }, 400);
      }
    );
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(key: KeyboardEvent) {
    this.userInteraction.userAction(key.key.toLowerCase());
  }

  // TODO: Refactorizar (si se puede)
  getCellsScale() {
    this.removeCellActiveClass();
    this.objectSoundActive = [];

    // detect the musical-grid__item that are inside the object detected
    this.objectsDetected.forEach(
      (objectsIntruments: ObjectDetector, index: number) => {
        const positionY =
          (objectsIntruments.y - this.configInitCalibration.zero_point_y1) *
          this.configInitCalibration.factor_y;
        const positionX =
          (objectsIntruments.x - this.configInitCalibration.zero_point_x1) *
            this.configInitCalibration.factor_x -
          50;

        const objectXcenter = Math.trunc(
          positionX + objectsIntruments.width / 2
        );
        const objectYcenter = Math.trunc(
          positionY + objectsIntruments.height / 2
        );

        // get all cell elements
        const cellElements = document.querySelectorAll('.musical-grid__item');

        cellElements.forEach((cellElement, index) => {
          let cellElementY = Math.trunc(
            Math.round(cellElement.getBoundingClientRect().y)
          );
          let cellElementX = Math.trunc(
            Math.round(cellElement.getBoundingClientRect().x)
          );
          let cellElementWidth = Math.round(
            cellElement.getBoundingClientRect().width
          );
          let cellElementHeight = Math.round(
            cellElement.getBoundingClientRect().height
          );

          // validate selectedScale and recalculate cellElementY and cellElementX
          if (
            objectXcenter > cellElementX &&
            objectXcenter < cellElementX + cellElementWidth &&
            objectYcenter > cellElementY &&
            objectYcenter < cellElementY + cellElementHeight
          ) {
            cellElement.classList.add('cell--active');
            /* console.log('cellElementY ACTIVE', index);
          console.log('cellElementY', cellElementY, 'cellElementX', cellElementX, 'cellElementWidth', cellElementWidth, 'cellElementHeight', cellElementHeight); */
            //cuantas veces alcanza las columnas en index
            let note = Math.floor(index / this.selectedScale.columns);
            let moment = index % this.selectedScale.columns;
            const objectSound: ObjectSound = {
              id: index,
              name: objectsIntruments.name,
              note: note,
              moment: moment,
            };
            this.objectSoundActive.push(objectSound);
            // if objectsDetected length is equal to objectSoundActive length, exit of loop
            if (this.objectsDetected.length === this.objectSoundActive.length) {
              return;
            }
          }
        });
      }
    );
    this.objectDetectService.setSoundsActive(this.objectSoundActive);
  }

  // remove all cell--active class from all cell elements
  removeCellActiveClass() {
    const cellElements = document.querySelectorAll('.musical-grid__item');
    cellElements.forEach((cellElement) => {
      cellElement.classList.remove('cell--active');
    });
  }
}
