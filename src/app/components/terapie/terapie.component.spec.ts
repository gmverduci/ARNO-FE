import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerapieComponent } from './terapie.component';

describe('TerapieComponent', () => {
  let component: TerapieComponent;
  let fixture: ComponentFixture<TerapieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TerapieComponent]
    });
    fixture = TestBed.createComponent(TerapieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
