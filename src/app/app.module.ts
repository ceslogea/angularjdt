import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import { JqdatatableComponent } from './jqdatatable/jqdatatable.component';
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';

@NgModule({
  declarations: [
    AppComponent,
    JqdatatableComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    DataTablesModule,
  ],
  providers: [
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}