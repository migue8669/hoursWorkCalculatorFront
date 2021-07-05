import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reportObject: any;

  constructor(private reportService : ReportService) { }
  reportForm = new FormGroup({
    idNumberReport: new FormControl(''),
    idNumberTechnician: new FormControl(''),
    dateInit: new FormControl(''),
    dateFinish: new FormControl(''),
    hourInit: new FormControl(''),
    hourFinish: new FormControl(''),
  });
  ngOnInit(): void {
    this.getReport();

  }
  
  onSubmit(formDirective:FormGroupDirective):void{
    this.getWeekNumber()
    for (let el of this.reportObject) {
      console.log(el);
      console.log(this.reportForm.value.idNumberReport);

      if (el.idNumberReport == this.reportForm.value.id) {
        alert('Ya existe un empleado con esa identificacion');
        formDirective.resetForm();

        break;
      } else {
        console.log(this.reportForm.value);
        this.reportService
          .create(this.reportForm.value)
          .subscribe((response) => {
            console.log(response);
          });
      }
    }
  }
  getWeekNumber () {
    let d = new Date();  //Creamos un nuevo Date con la fecha de "this".
    d.setHours(0, 0, 0, 0);   //Nos aseguramos de limpiar la hora.
    d.setDate(d.getDate() + 4 - (d.getDay() || 7)); // Recorremos los días para asegurarnos de estar "dentro de la semana"
    //Finalmente, calculamos redondeando y ajustando por la naturaleza de los números en JS:
    console.log(d)
  //  return Math.ceil((((d.getDate() - new Date(d.getFullYear(), 0, 1))  / 8.64e7) + 1) / 7);
};
  getReport(): void {
    this.reportService.getAll().subscribe((data) => {
      this.reportObject = data;
      console.log(data);
    });
  }
}
