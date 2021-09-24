import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCardItemComponent } from './list-card-item.component';

describe('ListCardItemComponent', () => {
  let component: ListCardItemComponent;
  let fixture: ComponentFixture<ListCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
