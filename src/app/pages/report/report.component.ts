import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { ComponentsService } from 'src/app/services/components.service';
import { ReportService } from 'src/app/services/report.service';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  uuidValue!:string;

  reportObject: any;
  contador: number = 0;
  msgCalculator: number=0;



  constructor(private reportService: ReportService, private componetService: ComponentsService) {}
  reportForm = new FormGroup({
    technicianIdentity: new FormControl(''),
    reportIdentityNumber: new FormControl(''),
    dateInit: new FormControl(''),
    dateFinish: new FormControl(''),
    hourInit: new FormControl(''),
    hourFinish: new FormControl(''),
    numWeek: new FormControl(''),
  });
  ngOnInit(): void {
    this.getReport();
this.componetService.customMessage.subscribe(msg=>{this.msgCalculator=msg;
  console.log(this.msgCalculator)}
  ) 
if(this.msgCalculator){
  this.reportService.get(this.msgCalculator).subscribe(e=>{console.log(e.items)
for (const iterator of e.items) {
  console.log(iterator.technicianIdentity)

      this.reportForm = this.reportObject[iterator.technicianIdentity];
      this.reportForm = new FormGroup({
     //   reportIdentityNumber: new FormControl(e.reportIdentityNumber),
     technicianIdentity: new FormControl(iterator.technicianIdentity.value),
        dateInit: new FormControl(iterator.dateInit),
        dateFinish: new FormControl(iterator.dateFinish),
        hourInit: new FormControl(iterator.hourInit),
        hourFinish: new FormControl(iterator.hourFinish),
        numWeek: new FormControl(iterator.numWeek),
    });}



  
  });
}
 }

  onSubmit(formDirective: FormGroupDirective): void {
    this.generateUUID();
    if(formDirective.value.dateFinish<formDirective.value.dateInit){
      alert("La fecha de finalización debe ser superior a la de inicion ")
    }else{

     if(this.msgCalculator!=null && this.msgCalculator>0){
      let dateString = formDirective.value.dateInit;
      let newDate = new Date(dateString);
      var result = this.getWeekNumber(newDate);
      console.log(result);
      this.reportForm.value.weekNum = result;

  
      this.reportService
      .update(this.msgCalculator, this.reportForm.value)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
     } else{

    let dateString = formDirective.value.dateInit;
    let newDate = new Date(dateString);
    console.log(dateString);
    console.log(newDate);

    var result = this.getWeekNumber(newDate);
    console.log(result);
    this.reportForm.value.numWeek = result;
 
      console.log(this.reportForm.value.reportIdentityNumber);

      this.reportForm.value.reportIdentityNumber = this.uuidValue;
      console.log(this.reportForm.value);
      this.reportService.create(this.reportForm.value).subscribe((response) => {
        console.log(response);
      });
  
this.reportForm.reset()  

}}
this.contador = 0;

}
  getWeekNumber(d: any) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart: any = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNum = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return weekNum;
  }
  getReport(): void {
    this.reportService.getAll().subscribe((data) => {
      this.reportObject = data;
      this.contador = data.id;
      console.log(data);
    });
  }
  generateUUID(){
    this.uuidValue=UUID.UUID();
    return this.uuidValue;
  }
}
