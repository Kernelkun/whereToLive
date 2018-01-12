import { Component, OnInit } from '@angular/core';
import { GoogleDirectionsService } from '../../Services/google-directions.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  origin: string;
  places = [];
  destinations;

  constructor(private _googleDirections: GoogleDirectionsService) {
    this.origin = _googleDirections.getOrigin();
    this.destinations = _googleDirections.getDestinations();
  }

  ngOnInit() {
    console.log(this.destinations);
    this.getTimeFromTo(this.origin, 'calle principe de vergara, 108');
  }

  getTimeFromTo(origin: string, destination: string) {
    this._googleDirections.getTimeFromTo(origin, destination).subscribe((res) => {
      console.log(res);
    });
  }

}
