import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExplorarRedPage } from './explorar-red.page';

describe('ExplorarRedPage', () => {
  let component: ExplorarRedPage;
  let fixture: ComponentFixture<ExplorarRedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExplorarRedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
