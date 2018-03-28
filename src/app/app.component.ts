import { Component, ViewChildren, QueryList, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { JqTableModel, JqTableModelBind } from './jqdatatable/jqdatatable.component';
import { JqdatatableService } from './jqdatatable/jqdatatable.service';

declare var $: any;
// declare var ace: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component2.html',
  styleUrls: [
    './app.component.scss',
    './app.component2.scss'
  ]
})
export class AppComponent implements AfterViewInit {


  modeljq: JqTableModel;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering

  constructor(private http: Http, private _jqdatatableService: JqdatatableService) {
    this.loadData();
  }

  public reloadData() {
    this.loadData();
  }

  public loadData() {
    this.http.get('https://qadvafilemappingapi.azurewebsites.net/api/layouts/getmetadatainfolist?groupId=25')
      .map(this.extractData)
      .subscribe(Result => {
        console.log(Result)

        let binds = new Array()
        binds.push(new JqTableModelBind('Id Entry', 'ID'))
        binds.push(new JqTableModelBind('Name', 'Name'))
        binds.push(new JqTableModelBind('File Guid', 'FileGuid'))
        binds.push(new JqTableModelBind('Group AD AzureID', 'GroupADAzureID'))
        binds.push(new JqTableModelBind('Type Description', 'TypeDescription'))
        binds.push(new JqTableModelBind('Identifier', 'Identifier'))
        this.modeljq = new JqTableModel(binds, Result)
        
        this._jqdatatableService.dtTrigger.next(true);
        this._jqdatatableService.reload();
      
      })
  }

  displayToConsole(datatableElement: DataTableDirective): void {
    datatableElement.dtInstance.then((dtInstance: DataTables.Api) => console.log(dtInstance));
  }

  rerender(): void {
    this.loadData()
      
  }

  ngOnInit(): void {

    // this.dtOptions = {
    //   // ajax: 'https://qadvafilemappingapi.azurewebsites.net/api/layouts/getmetadatainfolist?groupId=25',
    //   responsive: false,
    //   columns: [
    //     { responsivePriority: 1 },
    //     { responsivePriority: 2 },
    //     { responsivePriority: 3 },
    //     { responsivePriority: 1, orderable: false }
    //   ],
    //   // responsive: {
    //   //   breakpoints: [
    //   //     {name: 'bigdesktop', width: Infinity},
    //   //     {name: 'meddesktop', width: 1480},
    //   //     {name: 'smalldesktop', width: 1280},
    //   //     {name: 'medium', width: 1188},
    //   //     {name: 'tabletl', width: 1024},
    //   //     {name: 'btwtabllandp', width: 848},
    //   //     {name: 'tabletp', width: 768},
    //   //     {name: 'mobilel', width: 480},
    //   //     {name: 'mobilep', width: 320}
    //   //   ]
    //   // },
    //   // scrollY: '50vh',
    //   // scrollCollapse: true
    // };

    //Merge 2 objects
    // Object.assign(this.dtOptions, this.ptBr);
  }

  btnQualquerCoisa(e: any, dt: any, node: any, config: any) {
    console.log()
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.Result || {};
  }

  ngAfterViewInit() {

  }

}
