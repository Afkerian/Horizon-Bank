import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearClienteComponente } from './crear-cliente.component';

describe('CrearClienteComponente', () => {
  let component: CrearClienteComponente;
  let fixture: ComponentFixture<CrearClienteComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearClienteComponente ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearClienteComponente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
