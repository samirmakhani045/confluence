import { ReportService } from './../../services/report.service';
import { ObservableService } from './../../services/observable.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";
import { lastValueFrom } from 'rxjs';

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // @ViewChild("chart")
  // chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  public pieChartOptions: Partial<PieChartOptions> | any;
  isChartFull = true;
  isminwidth :any = "100%";
  dashboardData:any

  constructor(
    private observableService: ObservableService,
    private reportService : ReportService
  ) {
    this.chartOptions = {
      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        width: this.isminwidth ? this.isminwidth : "20%",
        // width: 100,
        redrawOnParentResize: true,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Product Trends by Month",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep"
        ]
      }
    };

    this.pieChartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: "donut",
        height: '300'
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center'
      },
    };
  }

 async ngOnInit() {
  await this.getDashboardReport();
    this.observableService.selectedSidenav$.subscribe((value) => { 
      setTimeout(() => {
        this.isChartFull = value;
      }, 500)
    });
   
  }

 async getDashboardReport(){
    let data: any = await lastValueFrom(this.reportService.getDashboardReport());
    this.dashboardData = data.model;
    console.log("🚀 ~ file: dashboard.component.ts ~ line 143 ~ DashboardComponent ~ getDashboardReport ~ this.dashboardData", this.dashboardData)
    

  }

}
