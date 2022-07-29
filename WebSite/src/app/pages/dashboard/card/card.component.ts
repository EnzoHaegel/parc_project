import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() title: string | undefined;

  public data: any;

  constructor() {
    this.data = [
      { Value: 25, Label: 'Residential' },
      { Value: 12, Label: 'Heating' },
      { Value: 11, Label: 'Lighting' },
      { Value: 18, Label: 'Other' },
      { Value: 37, Label: 'Cooling' },
    ];
  }

  ngOnInit(): void {}
}
