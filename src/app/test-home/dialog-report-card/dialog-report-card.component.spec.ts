import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogReportCardComponent } from './dialog-report-card.component';

describe('DialogReportCardComponent', () => {
  let component: DialogReportCardComponent;
  let fixture: ComponentFixture<DialogReportCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogReportCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
