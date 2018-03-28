import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { DataTableDirective } from "angular-datatables";
import { JqdatatableService } from "./jqdatatable.service";

declare var $: any;

/**
 * 
 */
export class JqTableModelBind {
  header: string;
  propertieName: string

  /**
   * Constructor
   * @param header Nome da Coluna
   * @param propertieName Nome da Property no model
   */
  constructor(header: string, propertieName: string) {
    this.header = header;
    this.propertieName = propertieName;
  }
}

/**
 * Clase base para DataTable
 */
export class JqTableModel {
  headLabels: Array<string>;
  propertieName: Array<string>;
  bodyData: Array<any>;
  bodyParseData: Array<any>;
  dtOptions: any;

  /**
   * 
   * @param thsNames 
   * @param propsNames 
   * @param body 
   * @param dtOptionsCuston 
   */
  constructor(binds: Array<JqTableModelBind>, body: Array<any>, dtOptionsCuston?: any) {

    this.headLabels = binds.map(r => r.header);
    this.propertieName = binds.map(r => r.propertieName);
    this.bodyData = body;

    this.bodyParseData = new Array();
    this.bodyData.map(r => {
      let entry = {}
      this.propertieName.map(x => {
        entry[x] = r[x]
      })
      this.bodyParseData.push(entry)
    })

    this.dtOptions = dtOptionsCuston;
  }
}

/**
 * hs-jqdatatable
 */
@Component({
  selector: 'hs-jqdatatable',
  templateUrl: './jqdatatable.component.html',
  styleUrls: ['./jqdatatable.component.scss'],
})

/**
 * hs-jqdatatable
 */
export class JqdatatableComponent implements OnChanges {
  
  @Input() dtmodel: JqTableModel;
  @Output() get: EventEmitter<any> = new EventEmitter();
  @Output() update: Subject<any> = new Subject();
  
  constructor(private http: Http, private _jqdatatableService: JqdatatableService) {
    this._jqdatatableService.dtTrigger.next();
  }
  ngOnInit(): void {
    this._jqdatatableService.dtTrigger.next();
    this.assiginGlobalConfig()
}
  assiginGlobalConfig() {
    $.extend(true, $.fn.dataTable.defaults, this.configPtBrLang());
  }
  
  retrieve(event, itemIndex, item) {
    this.get.emit({ event, itemIndex, item });
    
  }

 
  
  ngAfterViewInit(): void {
    console.log('AfterViewInit')
    this._jqdatatableService.dtTrigger.next();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges')
    this._jqdatatableService.dtTrigger.next();
  }

  configPtBrLang() {
    return {
      "lengthMenu": [[15, 25, 50, -1], [15, 25, 50, "Todos"]],
      "oLanguage": {
        "sEmptyTable": "Nenhum registro encontrado",
        "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
        "sInfoFiltered": "(Filtrados de _MAX_ registros)",
        "sInfoPostFix": "",
        "sInfoThousands": ".",
        "sLengthMenu": "_MENU_ resultados por página",
        "sLoadingRecords": "Carregando...",
        "sProcessing": "Processando...",
        "sZeroRecords": "Nenhum registro encontrado",
        "sSearch": "",
        "sSearchPlaceholder": "Procurar por...",
        "oPaginate": {
          "sNext": '&#8250;',
          "sPrevious": '&#8249;',
          "sFirst": "&laquo;",
          "sLast": "&raquo;"
        },
        "oAria": {
          "sSortAscending": ": Ordenar colunas de forma ascendente",
          "sSortDescending": ": Ordenar colunas de forma descendente"
        }
      },
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        {
          extend: 'copyHtml5',
          exportOptions: {
            columns: [0, ':visible']
          }
        },
        {
          extend: 'csvHtml5',
          exportOptions: {
            columns: [':visible']
          }
        },
        {
          extend: 'pdfFlash',
          exportOptions: {
            columns: [0, 1, 2, 5]
          }
        },
        'colvis'
      ],
      processing: true,
      destroy: true,
      "columnDefs": [
        { "className": "dt-center", "targets": "_all" }
      ],
      "initComplete": function(settings, json) {
        // alert( 'DataTables has finished its initialisation.' );
      }
    };
  }


}
