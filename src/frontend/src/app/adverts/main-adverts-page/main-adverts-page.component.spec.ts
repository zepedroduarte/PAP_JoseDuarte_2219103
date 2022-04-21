import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAdvertsPageComponent } from './main-adverts-page.component';

describe('MainAdvertsPageComponent', () => {
  let component: MainAdvertsPageComponent;
  let fixture: ComponentFixture<MainAdvertsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainAdvertsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAdvertsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
