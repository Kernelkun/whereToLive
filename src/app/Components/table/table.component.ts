import { Component, OnInit } from '@angular/core';
import { GoogleDirectionsService } from '../../Services/google-directions.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  origin: string;
  stops = [];
  places = [];
  destinations;

  constructor(private _googleDirections: GoogleDirectionsService) {
    this.origin = _googleDirections.getOrigin();
    this.stops = _googleDirections.getStops();
    this.destinations = _googleDirections.getDestinations();
  }

  ngOnInit() {
    // this.getTimeFromTo('Av. de Vicente Aleixandre, 10. Leganés', 1);
    this.getAllTimes();
  }

  getTimes(origin: string, key: number) {
    this.stops.forEach((item, index) => {
      this._googleDirections.getTimeFromTo(origin, item.address).subscribe((res) => {
        this.destinations[key][item.name] = (Math.round(((res.routes[0].legs[0].duration.value / 60) + 0.00001) * 100) / 100) * 2;

        this.destinations[key].total = Math.round((this.destinations[key].work + this.destinations[key].dojo + 0.00001) * 100) / 100;

        const number = this.destinations[key].total - this.destinations[0].total;

        this.destinations[key].dif = Math.round((number + 0.00001) * 100) / 100;

        // this.destinations[0].dif = 0;
      });
    });
  }

  getAllTimes() {
    this.destinations.forEach((item, index) => {
      this.getTimes(item.address, index);
    });
  }

}
