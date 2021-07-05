import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { ReportComponent } from './pages/report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    CalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
