import { Component, OnInit } from '@angular/core';
import { GoogleDirectionsService } from '../../Services/google-directions.service';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { ActivatedRoute, Router } from '@angular/router';


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
  complete: number;

  constructor(private _googleDirections: GoogleDirectionsService) {
    this.origin = _googleDirections.getOrigin();
    this.stops = _googleDirections.getStops();
    this.destinations = _googleDirections.getDestinations();
  }

  ngOnInit() {
    this.getAllTimes();
  }

  processResponse(r) {
    r.forEach((response, index) => {
      this.destinations[response.index][response.name] =
        (Math.round(((response.routes[0].legs[0].duration.value / 60) + 0.00001) * 100) / 100) * 2;

      let sumStops = 0;
      this.stops.forEach((sum, sIndex) => { sumStops = sumStops + this.destinations[response.index][sum.name]; });
      this.destinations[response.index].total = Math.round((sumStops + 0.00001) * 100) / 100;

      const number = this.destinations[response.index].total - this.destinations[0].total;
      this.destinations[response.index].dif = Math.round((number + 0.00001) * 100) / 100;
    });
  }

  getAllTimes() {
    const test = [];
    this.destinations.forEach((item, index) => {
      this.stops.forEach((stop, sIndex) => {
        test.push(this._googleDirections.getTimeFromTo(item.address, stop.address, stop.name, index));
      });
    });
    forkJoin(test).subscribe(
      (r) => { this.processResponse(r); },
      (e) => { console.log(e); },
      () => { this.compareTimes(); }
    );
  }

  compareTimes() {
    this.destinations.forEach((dest, destIndex) => {
      this.stops.forEach((stop, stopIndex) => {
        if (destIndex > 0 ) {
          if (this.destinations[destIndex][stop.name] < this.destinations[0][stop.name]) {
            this.destinations[destIndex][stop.name + 'Comparision'] = 'down';
          } else {
            this.destinations[destIndex][stop.name + 'Comparision'] = 'up';
          }
        }

      });

      if (destIndex > 0) {
        const indexTotal = this.destinations[destIndex]['total'];
        const total = this.destinations[0]['total'];

        this.destinations[destIndex]['totalComparision'] = (indexTotal < total ? 'down' : 'up' );

        const indexDif = this.destinations[destIndex]['dif'];
        const dif = this.destinations[0]['dif'];

        this.destinations[destIndex]['difComparision'] = (indexDif < dif ? 'down' : 'up' );
      }
    });
  }

}
