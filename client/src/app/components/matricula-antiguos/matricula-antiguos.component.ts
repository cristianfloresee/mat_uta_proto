import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-matricula-antiguos',
  templateUrl: './matricula-antiguos.component.html',
  styleUrls: ['./matricula-antiguos.component.css']
})
export class MatriculaAntiguosComponent implements OnInit {
  @Input() antiguos: string;
  @Input() selected: any;
  constructor() { }

  ngOnInit() {
     console.log("antiguos: ", this.antiguos['FACULTADES']);
  }

}
