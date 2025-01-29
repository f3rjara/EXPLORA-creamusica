import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GhostGridComponent } from './ghost-grid.component';

describe('GhostGridComponent', () => {
  let component: GhostGridComponent;
  let fixture: ComponentFixture<GhostGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GhostGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GhostGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
