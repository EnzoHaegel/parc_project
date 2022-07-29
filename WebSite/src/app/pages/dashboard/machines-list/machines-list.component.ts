import { Component, Input, OnInit } from '@angular/core';
import { IMachine } from 'src/app/models/IMachines';
import { MachinesService } from 'src/app/services/machines.service';

@Component({
  selector: 'app-machines-list',
  templateUrl: './machines-list.component.html',
  styleUrls: ['./machines-list.component.scss']
})
export class MachinesListComponent implements OnInit {
  @Input()
  public id: number = 0;

  @Input()
  public machine!: IMachine;

  public panelOpenState = false;

  public randomBool: boolean = this.randomTrueOrFalse();

  constructor(private machinesService: MachinesService) { }

  ngOnInit(): void {
    if (!this.machine) {
      this.machinesService.getMachine(this.id).subscribe(
        (data: any) => {
          this.machine = data;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  public randomTrueOrFalse(): boolean {
    return Math.random() >= 0.5;
  }
}
