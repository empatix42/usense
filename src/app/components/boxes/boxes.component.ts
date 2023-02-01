import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.css'],
})
export class BoxesComponent implements OnInit {
  @Input() passwordStatus!: string;

  constructor() {}

  ngOnInit(): void {}
}
