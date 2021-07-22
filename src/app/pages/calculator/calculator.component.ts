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
  contact!: Array<Object>;


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
  }

 // onSubmit(formDirective: FormGroupDirective): void {
 //   if ((this.updateValidate = true)) {
      //console.log('updateValidate');
     // console.log(this.calculatorObject);
     // console.log(this.calculatorForm.value);

      //this.calculatorService
        //.update(this.calculatorForm.value.id, this.calculatorForm.value)
        //.subscribe(
          //(response) => {
          // console.log(response);
         // },
         // (error) => {
        //    console.log(error);
      //    }
    //    );
   // } else if (this.calculatorObject.length == 0) {
   //   this.calculatorService
       // .create(this.calculatorForm.value)
       // .subscribe((response) => {
        ///  console.log(response);
      //  });
    //  formDirective.resetForm();
   // } else {
     // for (let el of this.calculatorObject) {
       // console.log(el);
     //   if (el.id == this.calculatorForm.value.id) {
   //       alert('Ya existe un empleado con esa identificacion');
         /// formDirective.resetForm();

       ///   break;
    ///    } else {
        ///  this.contador++;
      //    this.calculatorForm.value.id = this.contador;
        //  this.calculatorService
       //     .create(this.calculatorForm.value)
   //         .subscribe((response) => {
     //         console.log(response);
           // });
         // formDirective.resetForm();

        //  break;
      //  }
     // }
   // }
 // }

  getEmployees(): void {
    this.calculatorService.getAll().subscribe((data) => {
      this.contact=[];
      this.contador = data.length;
      
      console.log(data.items.length)

for (const iterator of data.items) {
  console.log(iterator)
  this.calculatorObject = Array.of(iterator);
  console.log(this.calculatorObject)  
      
 // console.log(data.items[iterator])
if(data.items[iterator]=undefined){
  break;
}}
  
});


}
    //  for (let index = 0; index <= data.items.length; index++) {
    //    console.log(index)
    //    console.log(data.items[index])
    //  if(data.items[index]=undefined){
    //    break;
    //  }
    //   this.calculatorObject = data.items[index];
    //   console.log(this.calculatorObject)       
    //  }



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
  this.calculatorService.create(formDirective.value);
  this.getEmployees();
  // this.calculatorService.get(this.reportForm.value.idNumberTechnician,this.reportForm.value.weekNum).subscribe((data)=>{
  //   console.log(this.calculatorObject)

  //   this.calculatorObject = data;});

  // //this.calculatorService.get()

  }
}
