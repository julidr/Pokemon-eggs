import { Component, OnInit } from '@angular/core';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { D3Service, D3, Selection} from 'd3-ng2-service';
import { Pokemon } from './../pokemon';
import { PokemonService } from './../services/pokemon.service';

import { NgIf } from '@angular/common';

@Component({
  selector: 'app-stadistics-eggs',
  templateUrl: './stadistics-eggs.component.html',
  styleUrls: ['./stadistics-eggs.component.css']
})
export class StadisticsEggsComponent implements OnInit {

  private d3: D3;
  private pokeInfo: Array<Pokemon> = [];
  private showBarChart = false;
  private isShowBarDraw = false;

  constructor(d3Service: D3Service, private pokemonService: PokemonService) {
    this.d3 = d3Service.getD3();
  }

  ngOnInit() {
    this.pokeInfo = this.pokemonService.getBabyCrib();

  }

  changeChartValue(value: number) {
    if (value == 1) {
      this.showBarChart = !this.showBarChart;
      this.showNumberOfEggBarChart();
      this.isShowBarDraw = true;
    }

  }

  showNumberOfEggBarChart() {
    let d3 = this.d3;
    if (this.isShowBarDraw == false) {
      let svg = d3.select('svg'),
        margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = +svg.attr('width') - margin.left - margin.right,
        height = +svg.attr('height') - margin.top - margin.bottom;
      let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);
      let g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      x.domain(this.pokeInfo.map(function (d) {
        return d.specie;
      }));
      y.domain([0, d3.max(this.pokeInfo, function (d) {
        return d.eggsHatched;
      })]);
      g.append('g')
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Eggs");

      g.selectAll(".bar")
        .data(this.pokeInfo)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.specie); })
        .attr("y", function (d) { return y(d.eggsHatched); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.eggsHatched); });

      svg.selectAll('.bar')
        .on('mouseover', changeBarColor)
        .on('mouseout', changeBarColorOut);
      d3.selectAll('.bar').style('fill', '#9fb6ff');
      d3.select('.axis--x path').style('display', 'none');
      d3.selectAll('.axis--x text').attr('font-size', '20');
      d3.selectAll('.axis--y text').attr('font-size', '20');

    }
    function changeBarColor(d, i) {
      d3.select(this).style('fill', '#ff7777');
    }

    function changeBarColorOut(d, i) {
      d3.select(this).style('fill', '#9fb6ff');
    }
  }

}
