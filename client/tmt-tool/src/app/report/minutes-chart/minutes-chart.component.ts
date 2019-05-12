import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as Highcharts from 'highcharts';

import { ReportService } from "../report.service";

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-minutes-chart',
  templateUrl: './minutes-chart.component.html',
  styleUrls: ['./minutes-chart.component.css']
})
export class MinutesChartComponent implements OnInit {

  @Input() params: any;
  data: any = [];
  chartOptions = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Impressions for the Air Date'
    },
    subtitle: {
      text: ''
    },
    xAxis: {
    },
    yAxis: {
      min: 0,
      max: 1000,
      title: {
        text: 'Impressions'
      }
    },
    series: {}
  }

  constructor(private activeModal: NgbActiveModal, private reportService: ReportService) {
    this.chartOptions.xAxis = {
      title: {
        text: 'Minute'
      },
      categories: this.getXAxis(),
      tickInterval: 10
    };
  }

  getXAxis() {
    var axisLabels = [];
    for (var counter = 1; counter <= 60; counter++) {
      axisLabels.push(counter);
    }
    return axisLabels;
  }
  ngOnInit() {
    this.reportService.getMOPData(this.params).subscribe(data => {
      this.data = data;
      var imps = this.data.map(x => Number.parseInt(x.Impressions));
      this.chartOptions.series = [{ name: 'Impressions', data: imps, color: 'orange'}];
      this.chartOptions.yAxis.max = Math.max.apply(Math, imps.map(function(o) { return o; }));
      Highcharts.chart('line-container', <Highcharts.Options>this.chartOptions);
    });
  }

}
