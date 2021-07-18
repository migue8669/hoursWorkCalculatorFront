import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { CalculatorService } from 'src/app/services/calculator.service';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor(private calculatorService: CalculatorService, private componentsService:ComponentsService) {}
  updateValidate: boolean = false;
  calculatorObject: any;
  contador: number = 0;
  filterPost='';


   i:number=0;
   reportForm = new FormGroup({
    idNumberTechnician: new FormControl(''),

    weekNum: new FormControl(''),
  });
  calculatorForm= new FormGroup({
    idNumberTechnician: new FormControl(''),
    id:new FormControl(''),

    normalHour: new FormControl(''),
    nocturnalhour: new FormControl(''),
    sundayHour:new FormControl(''),
    extraNormalHour:new FormControl(''),
    extraNocturnalHour:new FormControl(''),
    extraSundayHour:new FormControl(''),
    numWeek:new FormControl(''),

  })
  ngOnInit(): void {
    this.getEmployees();
  }

  onSubmit(formDirective: FormGroupDirective): void {
    if ((this.updateValidate = true)) {
      console.log('updateValidate');
      console.log(this.calculatorObject);
      console.log(this.calculatorForm.value);

      this.calculatorService
        .update(this.calculatorForm.value.id, this.calculatorForm.value)
        .subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
    } else if (this.calculatorObject.length == 0) {
      this.calculatorService
        .create(this.calculatorForm.value)
        .subscribe((response) => {
          console.log(response);
        });
      formDirective.resetForm();
    } else {
      for (let el of this.calculatorObject) {
        console.log(el);
        if (el.id == this.calculatorForm.value.id) {
          alert('Ya existe un empleado con esa identificacion');
          formDirective.resetForm();

          break;
        } else {
          this.contador++;
          this.calculatorForm.value.id = this.contador;
          this.calculatorService
            .create(this.calculatorForm.value)
            .subscribe((response) => {
              console.log(response);
            });
          formDirective.resetForm();

          break;
        }
      }
    }
  }

  getEmployees(): void {
    this.calculatorService.getAll().subscribe((data) => {
      this.calculatorObject = data;
      this.contador = data.length;
      console.log(this.calculatorObject)
    });
  }

  delete(i: any): void {
    console.log(i);
    this.calculatorService.delete(i).subscribe((response) => {
      console.log(response);
    });
  }
  sendId(id:any){
this.componentsService.changeMessage(id);
  }
search(formDirective:FormGroupDirective): void{
  this.calculatorService.get(this.reportForm.value.idNumberTechnician,this.reportForm.value.weekNum)

  //this.calculatorService.get()

}
}
