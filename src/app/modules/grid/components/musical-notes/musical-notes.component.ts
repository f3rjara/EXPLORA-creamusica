import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-musical-notes',
  templateUrl: './musical-notes.component.html',
  styleUrls: ['./musical-notes.component.scss'],
})
export class MusicalNotesComponent implements OnInit, OnDestroy {
  // input selectedScale
  @Input() selectedScale: any;

  languageSubscribe: Subscription;

  public langEnglishMap = {
    'si.': 'B.',
    'la#.': 'A#.',
    'la.': 'A.',
    'sol#.': 'G#.',
    'sol.': 'G.',
    'fa#.': 'F#.',
    'fa.': 'F.',
    'mi.': 'E.',
    're#.': 'D#.',
    're.': 'D.',
    'do#.': 'C#.',
    'do.': 'C.',
  };

  public language: string = '';

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.languageSubscribe = this.activatedRoute.params.subscribe(
      ({ language }) => (this.language = language)
    );
  }

  ngOnDestroy(): void {
    this.languageSubscribe.unsubscribe();
  }
}
