import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorouselComponent } from './corousel.component';

describe('CorouselComponent', () => {
  let component: CorouselComponent;
  let fixture: ComponentFixture<CorouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
