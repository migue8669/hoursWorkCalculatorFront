import { ReportComponent } from './pages/report/report.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './pages/calculator/calculator.component';

const routes: Routes = [
  { path: '', component: ReportComponent },
  { path: 'servicio-tecnico', component: ReportComponent },
  { path: 'calculo', component: CalculatorComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
