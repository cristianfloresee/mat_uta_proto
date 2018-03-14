import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-matricula-nuevos',
  templateUrl: './matricula-nuevos.component.html',
  styleUrls: ['./matricula-nuevos.component.css']
})
export class MatriculaNuevosComponent implements OnInit {
  @Input() nuevos: string;
  constructor() { }

  ngOnInit() {
  }

}
