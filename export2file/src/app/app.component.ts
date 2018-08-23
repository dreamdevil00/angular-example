import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { data } from '../assets/sample-data';
declare const $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('tableTpl')
  tableTpl: ElementRef<any>;
  public data: any[] = [];

  ngOnInit() {}

  fetchData() {
    setTimeout(() => {
      this.data = data;
    }, 1000);
  }

  exportExcel() {
    const ele = this.tableTpl.nativeElement.outerHTML;
    const html = `<html><head><meta charset="utf-8"><title>ExportSheet</title></head><body>${ele}</body></html>`;
    const blob = new Blob([html], { type: 'application/vnd.ms-excel' });

    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, 'Sheet1.xls');
    } else {
      const link = document.createElement('a');
      link.style.display = 'none';
      document.body.appendChild(link);

      if (link.download !== undefined) {
        link.setAttribute('href', URL.createObjectURL(blob));
        link.setAttribute('download', 'Sheet1.xls');
        link.click();
      }
      document.body.removeChild(link);
    }
  }
}
