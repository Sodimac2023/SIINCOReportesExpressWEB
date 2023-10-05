import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextQueryComponent } from './text-query.component';

describe('TextQueryComponent', () => {
  let component: TextQueryComponent;
  let fixture: ComponentFixture<TextQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextQueryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
