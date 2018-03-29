import { Component, ViewChildren, QueryList, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { JqTableModel, JqTableModelBind } from './jqdatatable/jqdatatable.component';

declare var $: any;
// declare var ace: any;


@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrls: []
})
export class AppComponent implements OnInit {

  public modeljq: JqTableModel;
  public modeljq2: JqTableModel;

  constructor() {
  }

  ngOnInit(): void {

    this.loadDataTable1()
    this.loadDataTable2()
    //Merge 2 objects
    // Object.assign(this.dtOptions, this.ptBr);
  }

  public loadDataTable1() {

    //https://datatables.net/
    let dtOptions = {
      actions: true,
      // responsive: true,
      columns: [
        { responsivePriority: 1 },
        { responsivePriority: 2 },
        { responsivePriority: 3 },
        { responsivePriority: 4, orderable: false },
        { responsivePriority: 5, orderable: false },
        { responsivePriority: 1, orderable: false },
      ],
      responsive: {
        breakpoints: [
          { name: 'bigdesktop', width: Infinity },
          { name: 'meddesktop', width: 1480 },
          { name: 'smalldesktop', width: 1280 },
          { name: 'medium', width: 1188 },
          { name: 'tabletl', width: 1024 },
          { name: 'btwtabllandp', width: 848 },
          { name: 'tabletp', width: 768 },
          { name: 'mobilel', width: 480 },
          { name: 'mobilep', width: 320 }
        ]
      },
      scrollY: '50vh',
      
      scrollCollapse: true
    };

    let binds = new Array()
    binds.push(new JqTableModelBind('Id Entry', 'ID'))
    binds.push(new JqTableModelBind('Name', 'Name'))
    binds.push(new JqTableModelBind('File Guid', 'FileGuid'))
    binds.push(new JqTableModelBind('Group AD AzureID', 'GroupADAzureID'))
    binds.push(new JqTableModelBind('Type Description', 'TypeDescription'))
    binds.push(new JqTableModelBind('Identifier', 'Identifier'))
    this.modeljq = new JqTableModel(binds, 'https://qadvafilemappingapi.azurewebsites.net/api/layouts/getmetadatainfolist?groupId=25', dtOptions)
  }

  public loadDataTable2() {

    let dtOptions = {
      scrollY: '20vh',
      scrollCollapse: true,
      scroll: 'overflow'
    };

    let binds = new Array()
    binds.push(new JqTableModelBind('Table 2 Id Entry', 'ID'))
    binds.push(new JqTableModelBind('Table 2 Name', 'Name'))
    binds.push(new JqTableModelBind('Table 2 File Guid', 'FileGuid'))
    binds.push(new JqTableModelBind('Table 2 Group AD AzureID', 'GroupADAzureID'))
    binds.push(new JqTableModelBind('Table 2 Type Description', 'TypeDescription'))
    binds.push(new JqTableModelBind('Table 2 Identifier', 'Identifier'))
    binds.push(new JqTableModelBind('Table 2 Id Entry', 'ID'))
    binds.push(new JqTableModelBind('Table 2 Name', 'Name'))
    binds.push(new JqTableModelBind('Table 2 File Guid', 'FileGuid'))
    binds.push(new JqTableModelBind('Table 2 Group AD AzureID', 'GroupADAzureID'))
    binds.push(new JqTableModelBind('Table 2 Type Description', 'TypeDescription'))
    binds.push(new JqTableModelBind('Table 2 Identifier', 'Identifier'))
    binds.push(new JqTableModelBind('Table 2 Id Entry', 'ID'))
    binds.push(new JqTableModelBind('Table 2 Name', 'Name'))
    binds.push(new JqTableModelBind('Table 2 File Guid', 'FileGuid'))
    binds.push(new JqTableModelBind('Table 2 Group AD AzureID', 'GroupADAzureID'))
    binds.push(new JqTableModelBind('Table 2 Type Description', 'TypeDescription'))
    binds.push(new JqTableModelBind('Table 2 Identifier', 'Identifier'))
    this.modeljq2 = new JqTableModel(binds, 'https://qadvafilemappingapi.azurewebsites.net/api/layouts/getmetadatainfolist?groupId=25', dtOptions)
  }

  public detalhes(e, i, obj){
    console.log('detalhes')
    console.log(e)
  }

  public editar(e, i, obj){
    console.log('detalhes')
    console.log(e)
  }

  public deletar(e, i, obj){
    console.log('detalhes')
    console.log(e)
  }

}
