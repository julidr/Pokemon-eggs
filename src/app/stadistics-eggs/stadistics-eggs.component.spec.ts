import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StadisticsEggsComponent } from './stadistics-eggs.component';

describe('StadisticsEggsComponent', () => {
  let component: StadisticsEggsComponent;
  let fixture: ComponentFixture<StadisticsEggsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StadisticsEggsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StadisticsEggsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
