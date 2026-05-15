import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoacaoComponent } from './doacao.component';

describe('DoacaoComponent', () => {
  let component: DoacaoComponent;
  let fixture: ComponentFixture<DoacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoacaoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DoacaoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
