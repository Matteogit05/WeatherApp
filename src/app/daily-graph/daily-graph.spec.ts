import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DailyGraph } from './daily-graph';

describe('DailyGraph', () => {
  let component: DailyGraph;
  let fixture: ComponentFixture<DailyGraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyGraph],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyGraph);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
