import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteAdvertsComponent } from './favorite-adverts.component';

describe('FavoriteAdvertsComponent', () => {
  let component: FavoriteAdvertsComponent;
  let fixture: ComponentFixture<FavoriteAdvertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteAdvertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteAdvertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
