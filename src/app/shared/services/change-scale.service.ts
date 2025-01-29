import { Injectable } from '@angular/core';
import { NotesScalesInterface } from '@core/interfaces/notes-scales.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChangeScaleService {
  private _columnsShow: number = 16;
  _musicalScales = {
    cromatica: {
      name: 'cromatica',
      keyBinding: 'q',
      rows: 12,
      columns: this._columnsShow,
      notes: ['si.', 'la#.', 'la.', 'sol#.', 'sol.', 'fa#.', 'fa.', 'mi.', 're#.', 're.', 'do#.', 'do.' ],
    },
    mayor: {
      name: 'mayor',
      keyBinding: 'w',
      rows: 7,
      columns: this._columnsShow,
      notes: ['si.', 'la.', 'sol.', 'fa.', 'mi.', 're.', 'do.'],
    },
    pentatonica: {
      name: 'pentatonica',
      keyBinding: 'e',
      rows: 5,
      columns: this._columnsShow,
      notes: ['sol.', 'fa.', 'mi.', 're.', 'do.'],
    },
  };

  private musicalScale$ = new BehaviorSubject<NotesScalesInterface>(
    this._musicalScales.cromatica
  );

  constructor() {}

  get getMusicalScale$(): Observable<NotesScalesInterface> {
    return this.musicalScale$;
  }

  setMusicalScale(name: string) {
    this.musicalScale$.next(this._musicalScales[name]);
  }
}
