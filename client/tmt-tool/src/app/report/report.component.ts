import { Component, OnInit } from '@angular/core';
import { ReportService } from "./report.service";
import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  shows: any = [];
  demos: any = [];
  dates: any = [];
  categories: any = [];
  data: any = [];
  selectedShow: string = 'WWE Raw';
  selectedDemo: string = 'A18-49';
  selectedDate: string = '01/24/2019';
  selectedCategory: string = 'Social class';
  chartOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Impressions for the Air Date'
    },
    subtitle:{
      text: ''
    },
    xAxis: {},
    yAxis: {
      min: 0,
      max: 10000,
      title: {
        text: 'Impressions'
      }
    },
    series:{}
  }


  constructor(private reportService: ReportService) {
    this.reportService.getShows().subscribe(data => {
      this.shows = data;
    })
    this.getDates();
    this.getDemos();
    this.getCategories();
    this.getData();
  }

  ngOnInit() {
  }

  getDates() {
    this.reportService.getDates({ show: this.selectedShow }).subscribe(data => {
      this.dates = data;
    });
  }

  getDemos() {
    this.reportService.getDemos({ show: this.selectedShow, date: this.selectedDate }).subscribe(data => {
      this.demos = data;
    });
  }

  getCategories() {
    this.reportService.getCategories({ show: this.selectedShow, date: this.selectedDate, demo: this.selectedDemo }).subscribe(data => {
      this.categories = data;
    });
  }

  getData() {
    this.reportService.getData({ show: this.selectedShow, date: this.selectedDate, demo: this.selectedDemo, category: this.selectedCategory }).subscribe(data => {
      this.data = data;
      var series = [{name:'Impressions', data:[]}];
      this.data.data.forEach(element => {
        series[0].data.push(Number.parseInt(element.Impressions));
      });
      this.chartOptions.xAxis = {
        categories: this.data.subCats
      };
      this.chartOptions.series = series;
      this.chartOptions.subtitle.text = this.selectedShow;
      Highcharts.chart('container', <Highcharts.Options>this.chartOptions);
    });
  }

}
