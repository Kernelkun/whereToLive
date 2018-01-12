import { Component, OnInit } from '@angular/core';
import { GoogleDirectionsService } from '../../Services/google-directions.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  origin: string;
  dojo: string;
  work: string;
  places = [];
  destinations;

  constructor(private _googleDirections: GoogleDirectionsService) {
    this.origin = _googleDirections.getOrigin();
    this.dojo = _googleDirections.getDojo();
    this.work = _googleDirections.getWork();
    this.destinations = _googleDirections.getDestinations();
  }

  ngOnInit() {
    // this.getTimeFromTo('Av. de Vicente Aleixandre, 10. Leganés', 1);
    this.getAllTimes();
  }

  getTimeFromTo(origin: string, key: number) {
    this._googleDirections.getTimeFromTo(origin, this.dojo).subscribe((res) => {
      this.destinations[key].dojo = Math.round(((res.routes[0].legs[0].duration.value / 60) + 0.00001) * 100) / 100;
    });

    this._googleDirections.getTimeFromTo(origin, this.work).subscribe((res) => {
      this.destinations[key].work = Math.round(((res.routes[0].legs[0].duration.value / 60) + 0.00001) * 100) / 100;

      const number = (this.destinations[key].work + this.destinations[key].dojo) - (this.destinations[0].work + this.destinations[0].dojo);

      this.destinations[key].dif = Math.round((number + 0.00001) * 100) / 100;

      // this.destinations[0].dif = 0;
    });
  }

  getAllTimes() {
    this.destinations.forEach((item, index) => {
      this.getTimeFromTo(item.address, index);
    });
  }

}
