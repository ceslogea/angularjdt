import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JqdatatableComponent } from './jqdatatable.component';

describe('JqdatatableComponent', () => {
  let component: JqdatatableComponent;
  let fixture: ComponentFixture<JqdatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JqdatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JqdatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
