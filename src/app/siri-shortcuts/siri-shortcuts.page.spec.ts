import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiriShortcutsPage } from './siri-shortcuts.page';

describe('SiriShortcutsPage', () => {
  let component: SiriShortcutsPage;
  let fixture: ComponentFixture<SiriShortcutsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiriShortcutsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiriShortcutsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
