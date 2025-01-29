import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawObjectsComponent } from './draw-objects.component';

describe('DrawObjectsComponent', () => {
  let component: DrawObjectsComponent;
  let fixture: ComponentFixture<DrawObjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawObjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
