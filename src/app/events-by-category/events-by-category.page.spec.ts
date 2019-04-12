import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsByCategoryPage } from './events-by-category.page';

describe('EventsByCategoryPage', () => {
    let component: EventsByCategoryPage;
    let fixture: ComponentFixture<EventsByCategoryPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ EventsByCategoryPage ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventsByCategoryPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
