import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEggsComponent } from './home-eggs.component';

describe('HomeEggsComponent', () => {
  let component: HomeEggsComponent;
  let fixture: ComponentFixture<HomeEggsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeEggsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEggsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
