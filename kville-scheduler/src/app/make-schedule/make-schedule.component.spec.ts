import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeScheduleComponent } from './make-schedule.component';

describe('MakeScheduleComponent', () => {
  let component: MakeScheduleComponent;
  let fixture: ComponentFixture<MakeScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
