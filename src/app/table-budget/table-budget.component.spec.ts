import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBudgetComponent } from './table-budget.component';

describe('TableBudgetComponent', () => {
  let component: TableBudgetComponent;
  let fixture: ComponentFixture<TableBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableBudgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
