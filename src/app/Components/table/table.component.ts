import { Component, OnInit } from '@angular/core';
import { GoogleDirectionsService } from '../../Services/google-directions.service';
import {Observable} from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";

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
    // this.getTimeFromTo('Av. de Vicente Aleixandre, 10. Leganés', 1);
    this.getAllTimes();
  }

  getTimes(origin: string, key: number) {
    let test = [];
    // this.stops.forEach((item, index) => {
    //   this._googleDirections.getTimeFromTo(origin, item.address).subscribe(
    //     (res) => {
    //       this.destinations[key][item.name] = (Math.round(((res.routes[0].legs[0].duration.value / 60) + 0.00001) * 100) / 100) * 2;

    //       this.destinations[key].total = Math.round((this.destinations[key].work + this.destinations[key].dojo + 0.00001) * 100) / 100;

    //       const number = this.destinations[key].total - this.destinations[0].total;

    //       this.destinations[key].dif = Math.round((number + 0.00001) * 100) / 100;

    //       // this.destinations[0].dif = 0;
    //     },
    //     (error) => console.log(error),
    //     () => {
    //       // console.log(this.destinations[key].name + ' complete!');
    //       this.complete++;
    //     }
    //   );

    // });

    this.stops.forEach((item, index) => {
      test.push(this._googleDirections.getTimeFromTo(origin, item.address, item.name));
    });
    forkJoin(test).subscribe( (r) => {

      r.forEach((response, index) => {
        this.destinations[key][response.name] = (Math.round(((response.routes[0].legs[0].duration.value / 60) + 0.00001) * 100) / 100) * 2;
  
        let sumStops = 0;
        this.stops.forEach((sum, sIndex) => { sumStops = sumStops + this.destinations[key][sum.name] });
        this.destinations[key].total = Math.round((sumStops + 0.00001) * 100) / 100;
  
        const number = this.destinations[key].total - this.destinations[0].total;
        this.destinations[key].dif = Math.round((number + 0.00001) * 100) / 100;
      });

      
    });
  }

  getAllTimes() {
    this.destinations.forEach((item, index) => {
      this.getTimes(item.address, index);
    });
    // this.destinations.forEach((item, key) => { this.compareTimes(item, key); });
  }

  compareTimes(item, key) {
    if ( key > 0 ) {
      if (this.destinations[key][item.name] > this.destinations[0][item.name]) {
        this.destinations[key].comparision = "down";
      } else {
        this.destinations[key].comparision = "up";
      }
    }
  }

}
