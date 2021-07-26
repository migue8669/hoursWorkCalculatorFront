import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ComponentsService } from 'src/app/services/components.service';
import { ReportService } from 'src/app/services/report.service';
import { UUID } from 'angular2-uuid';
import { not } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  uuidValue!: string;

  reportObject: any;
  contador: number = 0;
  msgCalculator: number = 0;

  constructor(
    private reportService: ReportService,
    private componetService: ComponentsService
  ) {}
  reportForm = new FormGroup({
    technicianIdentity: new FormControl('', Validators.required),
    reportIdentityNumber: new FormControl(''),
    dateInit: new FormControl('',Validators.required),
    dateFinish: new FormControl('',Validators.required),
    hourInit: new FormControl('',Validators.required),
    hourFinish: new FormControl('',Validators.required),
    numWeek: new FormControl(''),
  });
  ngOnInit(): void {
    this.getReport();
    this.componetService.customMessage.subscribe((msg) => {
      this.msgCalculator = msg;
      console.log(this.msgCalculator);
    });
    if (this.msgCalculator) {
      this.reportService.get(this.msgCalculator).subscribe((e) => {
        console.log(e.items);
        for (const iterator of e.items) {
          console.log(iterator.technicianIdentity);

          this.reportForm = this.reportObject[iterator.technicianIdentity];
          this.reportForm = new FormGroup({
            //   reportIdentityNumber: new FormControl(e.reportIdentityNumber),
            technicianIdentity: new FormControl(
              iterator.technicianIdentity.value || '',
              Validators.required
            ),
            dateInit: new FormControl(iterator.dateInit|| '',
            Validators.required
          ),
            dateFinish: new FormControl(iterator.dateFinish|| '',
            Validators.required
          ),
            hourInit: new FormControl(iterator.hourInit|| '',
            Validators.required
          ),
            hourFinish: new FormControl(iterator.hourFinish|| '',
            Validators.required
          ),
            numWeek: new FormControl(iterator.numWeek|| '',
            Validators.required
          )
          });
        }
      });
    }
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  onSubmit(formDirective: FormGroupDirective): void {

    let dateInitHelper = new Date (formDirective.value.dateInit);
    let dateFinishHelper= new Date (formDirective.value.dateFinish);
   

    this.generateUUID();
    if (
      dateInitHelper > dateFinishHelper
    ) {
      alert('La fecha de finalización debe ser superior a la de inicio ');
    } else {
      if (this.msgCalculator != null && this.msgCalculator > 0) {
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
      } else {
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
        this.reportService
          .create(this.reportForm.value)
          .subscribe((response) => {
            console.log(response);
          });

        this.reportForm.reset();
      }
    }
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
  generateUUID() {
    this.uuidValue = UUID.UUID();
    return this.uuidValue;
  }
}
