import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterPipe } from 'src/app/pipes/filter.pipe';

import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],

      declarations: [ CalculatorComponent,FilterPipe ]
      
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(FilterPipe).toBeDefined();
    const pipe = new FilterPipe();

    var obj =  {
      "id": 1,
      "idNumberTechnician": 2,
      "name": "a",
      "normalHour": "string",
      "nocturnalhour": "string",
      "sundayHour": "string",
      "extraNormalHour": "string",
      "extraNocturnalHour": "string",
      "extraSundayHour": "string"
    };

    expect(  pipe.transform(obj,"name")).toContain(["name"])
    expect(component).toBeTruthy();
  });
});
