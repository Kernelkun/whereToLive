import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class GoogleDirectionsService {
  googleMapsApi = 'AIzaSyC_sfV80Y0jkZFwTzopi4oSfsP6X8B00Bs';
  key = '&key=' + this.googleMapsApi;
  baseUrl = 'https://maps.googleapis.com/maps/api/directions/json?';

  data = {
    'origin': 'Humanes de Madrid',
    'dojo': 'Humanes de Madrid',
    'work': 'Calle Príncipe de Vergara, 108. Madrid',
    'destinations': [
        { name: 'Humanes', address: 'Calle Camilo José Cela, 1' },
        { name: 'Leganés', address: 'Av. de Vicente Aleixandre, 10. Leganés' },
        { name: 'Fuenlabrada', address: 'Calle de Austria, 12. Fuenlabrada' },
        { name: 'Alcorcón', address: 'Av. de los Derechos Humanos, 19, 28924 Alcorcón, Madrid' }
      ]
  };

  constructor(private http: Http) { }

  getOrigin() {
    return this.data.origin;
  }

  getDojo() {
    return this.data.dojo;
  }

  getWork() {
    return this.data.work;
  }

  getData() {
    return this.data;
  }

  getDestinations() {
    return this.data.destinations;
  }

  getTimeFromTo(origin: string, destination: string) {
    const queryURL = this.baseUrl + 'origin=' + origin + '&destination=' + destination + this.key + '&mode=transit';
    return this.http.get(queryURL).map((data) => {
      return data.json();
    });
  }
}
