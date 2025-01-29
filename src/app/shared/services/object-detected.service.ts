import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, Observable, BehaviorSubject } from 'rxjs';
import { ObjectDetector } from '@core/interfaces/object-detector.interface';
import { ObjectSound } from '@core/interfaces/object-sound.interface';

@Injectable({
  providedIn: 'root',
})
export class ObjectDetectedService {
  
  private objectDetect: ObjectDetector[] = [];
  // Observer for Objects Detected in socket
  private objectDetected$ = new BehaviorSubject<ObjectDetector[]>( this.objectDetect );
  get getObjectsDetected$(): Observable<ObjectDetector[]> {return this.objectDetected$;  }
  setObjectsDetected(objectsDetected: ObjectDetector[]) { this.objectDetected$.next(objectsDetected); }


  private soundsActive: ObjectSound[] = [];
  // Observer for Objects Detected Sounds in socket
  private soundsActive$ = new BehaviorSubject<ObjectSound[]>(this.soundsActive);
  get getSoundsActive$(): Observable<ObjectSound[]> { return this.soundsActive$; }
  setSoundsActive(soundDetected: ObjectSound[]) { this.soundsActive$.next(soundDetected); }

  private objectCalibration: ObjectDetector[] = [];
  // Observer for Objects Calibrated Detected in socket
  private objectCalibration$ = new BehaviorSubject<ObjectDetector[]>(this.objectCalibration);
  get getObjectsCalibration$(): Observable<ObjectDetector[]> { return this.objectCalibration$; }
  setObjectsCalibration( objectsCalibration: ObjectDetector[]) { this.objectCalibration$.next(objectsCalibration); }


  constructor(private _socket: Socket) {}
  
  // Activate Camera and listening objects for do submitted
  socketObjectDetect(): Observable<any> {
    this._socket.emit('listenObjectDetect');
    return this._socket
      .fromEvent('response')
      .pipe(map((response: any) => response));
  }

  socketEmitObjectDetect(): Observable<ObjectDetector[]> {
    return this._socket
      .fromEvent<ObjectDetector[]>('objectsDetect')
      .pipe(map((ObjectDetector) => ObjectDetector));
  }

  // Stop Camera and restart experience
  stopSocketObjectDetect() {
    this._socket.emit('stopCapture' , {'force_disconnect': false } );
    return this._socket
      .fromEvent('stopExperience')
      .pipe( map((stopExperience: { stopExperience: boolean }) => stopExperience) );
  }
}
