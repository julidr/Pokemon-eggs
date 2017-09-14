import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEggsComponent } from './my-eggs.component';

describe('MyEggsComponent', () => {
  let component: MyEggsComponent;
  let fixture: ComponentFixture<MyEggsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyEggsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEggsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
