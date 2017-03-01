import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Configv2Component } from './configv2.component';

describe('Configv2Component', () => {
  let component: Configv2Component;
  let fixture: ComponentFixture<Configv2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Configv2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Configv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
