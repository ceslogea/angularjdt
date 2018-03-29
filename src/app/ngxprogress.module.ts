import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    HttpClientModule,
    NgProgressModule.forRoot(),
    NgProgressHttpModule
  ]
})

export class Ngxprogress{}