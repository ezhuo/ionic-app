import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import Chart from 'chart.js';
import { NativeService } from "../../../core/utils/native.service"; // 导入chart.js

/*
  Generated class for the ChartjsDemo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chartjs-demo',
  templateUrl: 'chartjs-demo.html'
})
export class ChartjsDemoPage {
  @ViewChild('chartBar') chartBar: ElementRef;
  @ViewChild('chartLine') chartLine: ElementRef;
  @ViewChild('chartPie') chartPie: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeService: NativeService) { }


  details(url) {
    this.nativeService.openUrlByBrowser(url);
  }


  ionViewDidEnter() {
    Chart.Bar(this.chartBar.nativeElement.getContext("2d"), {
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '呵呵',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    Chart.Line(this.chartLine.nativeElement.getContext("2d"), {
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "哈哈",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false,
          }
        ]
      }
    });

    Chart.Doughnut(this.chartPie.nativeElement.getContext("2d"), {
      data: {
        labels: [
          "Red",
          "Blue",
          "Yellow"
        ],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
            ]
          }]
      }
    });

  }

}
