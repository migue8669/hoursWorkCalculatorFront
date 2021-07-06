import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { CalculatorService } from 'src/app/services/calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor(private calculatorService: CalculatorService) {}
  updateValidate: boolean = false;
  calculatorObject: any;
  contador: number = 0;
  filterPost='';

   i:number=0;
  calculatorForm= new FormGroup({
    idNumberTechnician: new FormControl(''),
    id:new FormControl(''),
    name:new FormControl(''),

    normalHour: new FormControl(''),
    nocturnalhour: new FormControl(''),
    sundayHour:new FormControl(''),
    extraNormalHour:new FormControl(''),
    extraNocturnalHour:new FormControl(''),
    extraSundayHour:new FormControl(''),
  })
  ngOnInit(): void {
    this.getProducts();
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

  getProducts(): void {
    this.calculatorService.getAll().subscribe((data) => {
      this.calculatorObject = data;
      this.contador = data.length;
      console.log(this.calculatorObject)
    });
  }
  update(index: any): void {
    this.i = index;
    this.updateValidate = true;
    this.calculatorForm = this.calculatorObject[index];
    this.calculatorForm = new FormGroup({
      id: new FormControl(this.calculatorObject[index].id),

      name: new FormControl(this.calculatorObject[index].name),
      description: new FormControl(this.calculatorObject[index].description),
      basePrice: new FormControl(this.calculatorObject[index].basePrice),
      taxRate: new FormControl(this.calculatorObject[index].taxRate),
      productStatus: new FormControl(this.calculatorObject[index].productStatus),
      stock: new FormControl(this.calculatorObject[index].stock),
    });
  }
  delete(i: any): void {
    console.log(i);
    this.calculatorService.delete(i).subscribe((response) => {
      console.log(response);
    });
  }


}
