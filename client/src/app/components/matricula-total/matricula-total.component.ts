import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-matricula-total',
  templateUrl: './matricula-total.component.html',
  styleUrls: ['./matricula-total.component.css']
})
export class MatriculaTotalComponent implements OnInit {
  @Input() total: string;
  constructor() { }

  ngOnInit() {
  }

}
