import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaDoacaoComponent } from './tabela-doacao.component';

describe('TabelaDoacaoComponent', () => {
  let component: TabelaDoacaoComponent;
  let fixture: ComponentFixture<TabelaDoacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaDoacaoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabelaDoacaoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
