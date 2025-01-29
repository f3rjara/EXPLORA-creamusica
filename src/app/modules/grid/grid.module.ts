import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridPageComponent } from './pages/grid-page/grid-page.component';
import { GhostGridComponent } from './components/ghost-grid/ghost-grid.component';
import { MusicalNotesComponent } from './components/musical-notes/musical-notes.component';
import { MusicalTimelineComponent } from './components/musical-timeline/musical-timeline.component';
import { TimeBarComponent } from './components/time-bar/time-bar.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { HandShapeComponent } from './components/svgs/hand-shape/hand-shape.component';
import { DrawObjectsComponent } from './components/draw-objects/draw-objects.component';
import { BoxMensageComponent } from './components/box-mensage/box-mensage.component';
import { BulbComponent } from './components/svgs/bulb/bulb.component';
import { NoteComponent } from './components/svgs/note/note.component';
import { TempoComponent } from './components/svgs/tempo/tempo.component';

const components = [
  GridPageComponent,
  GhostGridComponent,
  MusicalNotesComponent,
  MusicalTimelineComponent,
  TimeBarComponent,
  DrawObjectsComponent,
  TutorialComponent,
  HandShapeComponent,
];
@NgModule({
  declarations: [...components, BoxMensageComponent, BulbComponent, NoteComponent, TempoComponent],
  imports: [CommonModule],
  exports: [...components],
})
export class GridModule {}
