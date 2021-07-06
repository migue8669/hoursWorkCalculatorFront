import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  reportObject: any;
  contador: number = 0;

  constructor(private reportService: ReportService) {}
  reportForm = new FormGroup({
    idNumberTechnician: new FormControl(''),
    id: new FormControl(''),
    dateInit: new FormControl(''),
    dateFinish: new FormControl(''),
    hourInit: new FormControl(''),
    hourFinish: new FormControl(''),
    weekNum: new FormControl(''),
  });
  ngOnInit(): void {
    this.getReport();
  }

  onSubmit(formDirective: FormGroupDirective): void {
    let dateString = formDirective.value.dateInit;
    let newDate = new Date(dateString);
    console.log(dateString);
    console.log(newDate);

    var result = this.getWeekNumber(newDate);
    console.log(result);
    this.reportForm.value.weekNum = result;
    for (let el of this.reportObject) {
      console.log(el);
      console.log(this.reportForm.value.id);

      this.reportForm.value.id = this.contador++;
      console.log(this.reportForm.value);
      this.reportService.create(this.reportForm.value).subscribe((response) => {
        console.log(response);
      });
      this.contador = 0;
      break;
    }
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
}
