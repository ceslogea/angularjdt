import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import { JqdatatableComponent } from './jqdatatable/jqdatatable.component';
import { JqdatatableService } from './jqdatatable/jqdatatable.service';

@NgModule({
  declarations: [
    AppComponent,
    JqdatatableComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    DataTablesModule,
  ],
  providers: [JqdatatableService],
  bootstrap: [ AppComponent ]
})
export class AppModule {}