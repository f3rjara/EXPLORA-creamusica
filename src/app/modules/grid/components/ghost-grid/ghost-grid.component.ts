import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-ghost-grid',
  templateUrl: './ghost-grid.component.html',
  styleUrls: ['./ghost-grid.component.scss'],
})
export class GhostGridComponent implements AfterViewInit {
  //public cellsGhostGrid: any[] = new Array(168);
  @Input() cellsGhostGrid: number[];
  @Input() columnsGhostGrid: number;
  @ViewChild('ghostGrid') ghostGrid: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    this.ghostGrid.nativeElement.style.setProperty(
      '--columns-show',
      this.columnsGhostGrid
    );
  }
}
