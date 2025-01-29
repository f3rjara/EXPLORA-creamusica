import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-box-mensage',
  templateUrl: './box-mensage.component.html',
  styleUrls: ['./box-mensage.component.scss']
})
export class BoxMensageComponent implements OnInit {

  @Input() icon: string;
  @Input() show_balloon: boolean  = false;

  constructor() { }

  ngOnInit(): void { }

}
