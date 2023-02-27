import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleclienteComponent } from './detallecliente.component';

describe('DetalleclienteComponent', () => {
  let component: DetalleclienteComponent;
  let fixture: ComponentFixture<DetalleclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleclienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
