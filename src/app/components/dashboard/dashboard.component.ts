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
  isminwidth: any = "100%";
  dashboardData: any;
  isLoading = false;
  pieChartlabels: any = [];
  pieChartSeries: any = [];

  constructor(
    private observableService: ObservableService,
    private reportService: ReportService
  ) {
  }

  async ngOnInit() {
    this.isLoading = true;
    await this.getDashboardReport();
    this.observableService.selectedSidenav$.subscribe((value) => {
      setTimeout(() => {
        this.isChartFull = value;
      }, 500)
    });
    this.isLoading = false;
  }

  async getDashboardReport() {
    let data: any = await lastValueFrom(this.reportService.getDashboardReport());
    this.dashboardData = data.model;
    this.preparePieChart()
    this.prepareLineChart()
  }

  preparePieChart() {
    this.pieChartOptions = {
      series: this.dashboardData.roleWiseCount.map((s: any) => s.totalUser),
      chart: {
        type: "donut",
        height: '300'
      },
      labels: this.dashboardData.roleWiseCount.map((r: any) => r.roleName),
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

  prepareLineChart() {
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
        text: "",
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
  }

}
