import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveCardComponent } from './remove-card.component';

describe('RemoveCardComponent', () => {
  let component: RemoveCardComponent;
  let fixture: ComponentFixture<RemoveCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
