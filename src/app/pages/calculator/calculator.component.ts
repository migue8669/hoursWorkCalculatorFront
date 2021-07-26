import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { CalculatorService } from 'src/app/services/calculator.service';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  constructor(
    private calculatorService: CalculatorService,
    private componentsService: ComponentsService
  ) {}
  updateValidate: boolean = false;
  calculatorObject: Array<any> = [];

  contador: number = 0;
  filterPost = '';

  i: number = 0;
  reportForm = new FormGroup({
    idNumberTechnician: new FormControl(''),

    weekNum: new FormControl(''),
  });
  calculatorForm = new FormGroup({
    technicianIdentity: new FormControl(''),

    hour: new FormControl(''),
    nightHour: new FormControl(''),
    sundayHour: new FormControl(''),
    extraHour: new FormControl(''),
    extraNightHour: new FormControl(''),
    extraSundayHour: new FormControl(''),
    numWeek: new FormControl(''),
  });
  ngOnInit(): void {}

  getEmployees(): void {
    this.calculatorService.getAll().subscribe((data) => {
      this.contador = data.length;
      console.log(data);

      console.log(data.items);
      data.items.forEach((element: any) => {
        this.calculatorObject.push(element);
        console.log(element);
      });
      console.log(this.calculatorObject);
    });
  }

  delete(i: any): void {
    console.log(i);
    this.calculatorService.delete(i).subscribe((response) => {
      console.log(response);
    });
  }
  sendId(id: any) {
    console.log(id);
    this.componentsService.changeMessage(id);
  }
  search(formDirective: FormGroupDirective) {
    formDirective.value.hour = '0';
    formDirective.value.nightHour = '0';
    formDirective.value.sundayHour = '0';
    formDirective.value.extraHour = '0';
    formDirective.value.extraNightHour = '0';
    formDirective.value.extraSundayHour = '0';
    console.log('search');
    this.calculatorService.create(formDirective.value).subscribe();
  }
  deleteAll() {
    console.log('deleteAll');
    this.calculatorService.deleteAll();
  }
}
