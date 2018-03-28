import { Injectable, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { DataTableDirective } from 'angular-datatables';

@Injectable()
export class JqdatatableService {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  private datatableElement: DataTableDirective;
  public dtTrigger: Subject<any> = new Subject();

  reload() {
    if (this.dtElement && this.dtElement.dtInstance){
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    }else{
      this.dtTrigger.next();
    }

  }

}