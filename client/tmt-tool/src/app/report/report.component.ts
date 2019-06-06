import { Component, OnInit } from '@angular/core';
import { ReportService } from "./report.service";
import * as Highcharts from 'highcharts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MinutesChartComponent } from "./minutes-chart/minutes-chart.component";
import { AppSettings } from '../app.settings';

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
  selectedDate: string = '1/24/2019';
  selectedCategory: string = 'Social class';
  chartOptions = {
    chart: {
      type: 'column',
      events: {}
    },
    title: {
      text: 'Impressions for the air date across distributors'
    },
    subtitle: {
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
    series: {}
  }


  constructor(private reportService: ReportService, private modalService: NgbModal) {
    var angularThis = this;
    this.chartOptions.chart.events = {
      load: function () {
        var axis = this.xAxis[0]
        var ticks = axis.ticks;
        Object.keys(ticks).forEach((point, i) => {
          if (ticks[point] && ticks[point].label) {
            var label = ticks[point].label.element

            label.onclick = function () {
              const modalRef = angularThis.modalService.open(MinutesChartComponent, { size: 'lg' })
              modalRef.componentInstance.params = {
                show: angularThis.selectedShow,
                demo: angularThis.selectedDemo,
                date: angularThis.selectedDate,
                category: angularThis.selectedCategory,
                distributor: ticks[point].label.textStr
              }
            }
          }

        })
      }

    };
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
      var series = [];
      console.log(data);

      this.data.subCats.forEach((subCat, index) => {
        series.push({
          name: subCat,
          data: [],
          stack: 'stack' + index,
          color: ''
        })
      });
      this.data.distributors.forEach(element => {
        this.data.subCats.forEach((subCat, index) => {
          var dataValues = this.data.data.filter(data => {
            return data.Sub_Cat == subCat && data.Distributor == element;
          });
          var seriesForSubCat = series.filter(seriesValue => {
            return seriesValue.name == subCat;
          })[0];
          seriesForSubCat.data.push(dataValues && dataValues.length > 0 ? Number.parseInt(dataValues[0].Impressions) : null)
          seriesForSubCat.color = AppSettings.colors[subCat.replace(' ','')];
        });
      });
      this.chartOptions.xAxis = {
        categories: this.data.distributors
      };
      this.chartOptions.series = series;
      this.chartOptions.subtitle.text = this.selectedShow;
      Highcharts.chart('container', <Highcharts.Options>this.chartOptions);
    });
  }

}
