import { Component, OnInit, ViewChild } from '@angular/core';
import { ILogs } from 'src/app/models/IScripts';
import { ScriptsService } from 'src/app/services/scripts.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit  {

  public logs!: ILogs[];
  public displayedLogs!: ILogs[];
  public displayedColumns: string[] = ['username', 'script', 'date'];
  public dataSource!: any;
  public BASE_URL = "http://localhost:4000/api"
  public form!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private scriptsService: ScriptsService
  ) {
    this.form = this.fb.group({
      search: [''],
    });
  }

  ngOnInit(): void {
    this.scriptsService.getLogsScripts().subscribe({
      next: (data) => {
        this.logs = data;
        // reverse the array to show the latest logs first
        this.logs.reverse();
        this.displayedLogs = this.logs;
        // set the data source
        this.dataSource = new MatTableDataSource<ILogs>(this.logs)
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  public onSubmit(): void {
    const val = this.form.value;

    this.displayedLogs = this.searchByUsername(val.search);
    if (this.displayedLogs.length === 0)
      this.displayedLogs = this.searchByScript(val.search);
    if (this.displayedLogs.length === 0)
      this.displayedLogs = this.searchByDate(val.search);

    this.dataSource = new MatTableDataSource<ILogs>(this.displayedLogs)
    this.dataSource.paginator = this.paginator;
  }

  private searchByUsername(username: string): ILogs[] {
    this.displayedLogs = this.logs.filter(log => log.username.toLowerCase().includes(username.toLowerCase()));
    return this.displayedLogs;
  }

  private searchByScript(script: string): ILogs[] {
    this.displayedLogs = this.logs.filter(log => log.script.toLowerCase().includes(script.toLowerCase()));
    return this.displayedLogs;
  }

  private searchByDate(date: string): ILogs[] {
    this.displayedLogs = this.logs.filter(log => log.date.toLowerCase().includes(date.toLowerCase()));
    return this.displayedLogs;
  }

  public reset() {
    this.form.reset();
    this.displayedLogs = this.logs;
  }
}
