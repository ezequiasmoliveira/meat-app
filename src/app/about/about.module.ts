import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AboutComponent } from './about.component';

const ROUTERS: Routes = [
  { path: '', component: AboutComponent}
];
@NgModule({
  declarations: [AboutComponent],
  imports: [RouterModule.forChild(ROUTERS)]
})
export class AboutModule {}
