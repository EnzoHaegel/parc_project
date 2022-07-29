import { Component, VERSION } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ChartOptions, ChartType } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { MachinesService } from 'src/app/services/machines.service';
import { IMachine } from 'src/app/models/IMachines';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  name = 'Angular ' + VERSION.major;
   
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabelsO: Label[] = ['PHP', '.Net', 'Java'];
  public pieChartDataS: SingleDataSet = [50, 30, 20];
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: any[] = [{}];

  public machine: IMachine[] = [];

  public cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
        };
      }

      return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
        table: { cols: 4, rows: 4 },
      };
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private machinesService: MachinesService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    let a,b,c = 0;
    a = Math.floor(Math.random() * 80);
    b = Math.floor(Math.random() * (100-a));
    c = 100 - a - b;
    this.pieChartData = [
      a,
      b,
      c
    ];

    this.machinesService.getAllMachines().subscribe(
      (data: IMachine[]) => {
        this.machine = data;
        this.calcPercentageOs();
      }
    );
  }

  public calcPercentageOs() {
    let os: string[] = [];
    this.machine.forEach(machine => {
      os.push(machine.system.os);
    });
    // fill this.pieChartLabels with every differents os in os array
    this.pieChartLabels = [...new Set(os)];
    // fill this.pieChartData with the number of occurence of each os in os array
    this.pieChartData = [];
    this.pieChartLabels.forEach(os => {
      let count = 0;
      this.machine.forEach(machine => {
        if (machine.system.os === os) {
          count++;
        }
      });
      this.pieChartData.push(count);
    });
    this.createRandomColor()
  }

  public getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  public createRandomColor(): any {
    this.pieChartColors = [
      {
        backgroundColor: [
          this.getRandomColor(),
          this.getRandomColor(),
          this.getRandomColor(),
          this.getRandomColor(),
          this.getRandomColor()
        ]
      }
    ];
    return this.pieChartColors
  }
}
