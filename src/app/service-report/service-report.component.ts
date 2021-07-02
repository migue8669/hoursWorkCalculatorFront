import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-service-report',
  templateUrl: './service-report.component.html',
  styleUrls: ['./service-report.component.css']
})
export class ServiceReportComponent implements OnInit {

  constructor() { }
  reportForm = new FormGroup({
    idTechnician: new FormControl(''),
    idReport: new FormControl(''),
    dateAndTimeInit: new FormControl(''),
    dateAndTimeFinish: new FormControl(''),

  });
  ngOnInit(): void {
  }

}
