import { Component, OnInit } from '@angular/core';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { D3Service, D3, Selection } from 'd3-ng2-service';

@Component({
  selector: 'app-stadistics-eggs',
  templateUrl: './stadistics-eggs.component.html',
  styleUrls: ['./stadistics-eggs.component.css']
})
export class StadisticsEggsComponent implements OnInit {

  private d3: D3;

  constructor(d3Service: D3Service) {
    this.d3 = d3Service.getD3();
  }

  ngOnInit() {
    let d3 = this.d3;
  }



}
