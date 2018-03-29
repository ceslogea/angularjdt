import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { DataTableDirective } from "angular-datatables";
import { NgProgressRef, NgProgressComponent } from "@ngx-progressbar/core";

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
  method: string;
  url: string;
  extractData: Subject<any>;
  actions: boolean;
  /**
   * 
   * @param binds binds de col / property
   * @param url url do serviço
   * @param dtOptionsCuston custon config do datatable
   */
  constructor(binds: Array<JqTableModelBind>, url: string, dtOptionsCuston?: any) {

    if (dtOptionsCuston != null && dtOptionsCuston.actions) {
      this.actions = true;
      if (dtOptionsCuston.columns != null)
        dtOptionsCuston.columns.push({ responsivePriority: -1, orderable: false })
    }
    this.url = url;
    this.headLabels = binds.map(r => r.header);
    this.propertieName = binds.map(r => r.propertieName);
    this.dtOptions = {}

    this.dtOptions = dtOptionsCuston;

  }

  setBody(body: any) {
    this.bodyData = body;

    this.bodyParseData = new Array();
    this.bodyData.map(r => {
      let entry = {}
      this.propertieName.map(x => {
        entry[x] = r[x]
      })
      this.bodyParseData.push(entry)
    })
  }

  setActions() {

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
  public dtTrigger: Subject<any> = new Subject();
  public dtOptions: any = {};
  @Input() dtmodel: JqTableModel;

  @Output() details: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  @Output() update: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;
  @ViewChild('barOne') progressBar: NgProgressComponent;
  constructor(private http: Http) {
    this.assiginGlobalConfig()
  }

  ngOnInit(): void {
  }

  assiginGlobalConfig() {
    $.extend(true, $.fn.dataTable.defaults, this.configPtBrLang());
  }

  detailsFn(event, itemIndex, item) {
    console.log('Event Emiter Details')
    this.details.emit({ event, itemIndex, item });
  }

  editFn(event, itemIndex, item) {
    this.edit.emit({ event, itemIndex, item });
  }

  deleteFn(event, itemIndex, item) {
    this.delete.emit({ event, itemIndex, item });
  }


  reload() {
    this.getData();
  }

  ngAfterViewInit(): void {
    this.getData();
  }

  getData() {
    this.progressBar.start();
    this.http.get(this.dtmodel.url)
      .map(this.extractData)
      .subscribe(Result => {
        this.dtmodel.setBody(Result);
        console.log(this.dtmodel)
        Object.assign(this.dtOptions, this.dtmodel.dtOptions);
        if (this.dtmodel.actions) {

        }
        console.log(this.dtOptions)
        console.log(this.dtmodel.dtOptions)
        this.dtTrigger.next();
        this.progressBar.complete();
      })
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges')
  }

  configPtBrLang() {
    let that = this;

    return {
      processing: true,
      "lengthMenu": [[15, 25, 50, -1], [15, 25, 50, "Todos"]],
      //"pagingType": "simple",
      "pagingType": "simple_numbers",
      // pagingType: 'numbers_no_ellipses',
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
        'colvis',
        {
          text: 'Reload (1)',
          key: '1',
          class: 'teste',
          action: function (e, dt, node, config) {
            that.reload();
          }
        }
      ],
      destroy: true,
      "columnDefs": [
        { "className": "dt-center", "targets": "_all" }
      ],
      "initComplete": function (settings, json) {
        // alert( 'DataTables has finished its initialisation.' );
      }
    };
  }

  displayToConsole(datatableElement: DataTableDirective): void {
    datatableElement.dtInstance.then((dtInstance: DataTables.Api) => console.log(dtInstance));
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.Result || {};
  }

}
