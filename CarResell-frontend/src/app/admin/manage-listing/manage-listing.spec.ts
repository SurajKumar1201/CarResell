import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageListing } from './manage-listing';

describe('ManageListing', () => {
  let component: ManageListing;
  let fixture: ComponentFixture<ManageListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageListing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageListing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
