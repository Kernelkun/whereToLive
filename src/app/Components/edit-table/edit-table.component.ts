import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css']
})
export class EditTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // model: Options = new Options(); //creamos objeto de opciones
  // @Output() onsubmit = new EventEmitter<any>();

  public submit() {
    // this.onsubmit.emit(this.model);
    // console.log(this.model);
    // this.model = new Options(0, '', 0, 0);
    console.log('hola submit');
  }

}
