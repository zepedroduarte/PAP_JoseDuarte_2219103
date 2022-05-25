import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertUserProfileComponent } from './advert-user-profile.component';

describe('AdvertUserProfileComponent', () => {
  let component: AdvertUserProfileComponent;
  let fixture: ComponentFixture<AdvertUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertUserProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
