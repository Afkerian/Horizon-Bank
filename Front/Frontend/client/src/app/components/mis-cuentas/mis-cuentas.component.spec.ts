import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisCuentasComponent } from './mis-cuentas.component';

describe('MisCuentasComponent', () => {
  let component: MisCuentasComponent;
  let fixture: ComponentFixture<MisCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisCuentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
