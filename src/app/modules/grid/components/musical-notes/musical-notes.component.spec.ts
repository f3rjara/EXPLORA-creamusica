import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicalNotesComponent } from './musical-notes.component';

describe('MusicalNotesComponent', () => {
  let component: MusicalNotesComponent;
  let fixture: ComponentFixture<MusicalNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicalNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicalNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
