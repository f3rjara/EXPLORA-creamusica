import { ObjectDetectedService } from '@shared/services/object-detected.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { configInitCalibration } from '@app/core/interfaces/calibrated.interface';
import { ObjectDetector } from '@app/core/interfaces/object-detector.interface';

@Injectable({
  providedIn: 'root'
})
export class CalibratedService {

  private configCalibration: configInitCalibration = {
    resolution_grid_x : 1820,
    resolution_grid_y : 860,
    zero_point_x1: 110,
    zero_point_y1: 10,
    factor_x:  1,
    factor_y: 1,
  }

  public objectCalibratedSuscription: Subscription;
  public objectsCalibrated: ObjectDetector[];

  constructor( private objectDetectedService: ObjectDetectedService ) { }

  private configInitCalibration$ = new BehaviorSubject<configInitCalibration>(this.configCalibration);
  get getConfigInitCalibration$(): Observable<configInitCalibration> { return this.configInitCalibration$; }
  setConfigInitCalibration(configInitCalibration: configInitCalibration) { this.configInitCalibration$.next(configInitCalibration); }

  initCalibrated( objectCalibration ) {   
    this.objectsCalibrated = objectCalibration;
    // filter objects detected with name 'calibrated'
    if (this.objectsCalibrated.length == 2 ){            
      // ordenar el array por el menor valor de X y Y
      this.objectsCalibrated.sort((a, b) => {
        if (a.x < b.x) { return -1; }
        if (a.x > b.x) { return 1; }
        return 0;
      });
      this.objectsCalibrated.sort((a, b) => {
        if (a.y < b.y) { return -1; }
        if (a.y > b.y) { return 1; }
        return 0;
      });
      this.setCalibrated();
    }
  }

  setCalibrated() {

    // Se rest 100 para no ver el timeline y 100 para no ver las notas y 40px adicional por margin por cada lado
    const resolutionScreenX = window.innerWidth;
    const resolutionScreenY = window.innerHeight;

    this.configCalibration.zero_point_x1 = this.objectsCalibrated[0].x;
    this.configCalibration.zero_point_y1 = this.objectsCalibrated[0].y;

    this.configCalibration.resolution_grid_x = ( (this.objectsCalibrated[1].x + this.objectsCalibrated[1].width) - this.configCalibration.zero_point_x1 ) - 40;
    this.configCalibration.resolution_grid_y = ( (this.objectsCalibrated[1].y + this.objectsCalibrated[1].height) - this.configCalibration.zero_point_y1 );

    // calculate factor resolution
    if (this.configCalibration.resolution_grid_x < resolutionScreenX) {
      this.configCalibration.factor_x = resolutionScreenX / this.configCalibration.resolution_grid_x;
    }
    if (this.configCalibration.resolution_grid_y < resolutionScreenY) {
      this.configCalibration.factor_y = resolutionScreenY / this.configCalibration.resolution_grid_y;
    }
    // save in local  storage
    this.configInitCalibration$.next(this.configCalibration);
  }

}
