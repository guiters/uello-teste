import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClientService } from '../../services/client/client.service';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  map;
  pos = {};
  @Output() address = new EventEmitter();
  directionsService;
  directionsDisplay;
  constructor(private clientService: ClientService) { }

  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(this.map);
  }

  onChangeHandler = function () {

  };
  initMap() {
    const address = this.address;
    const clientService = this.clientService;
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -23.5759577, lng: -46.5887472 },
      zoom: 11
    });
    const geocoder = new google.maps.Geocoder;
    const infoWindow = new google.maps.InfoWindow;
    const directionsService = new google.maps.DirectionsService;
    const directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(map);

    document.getElementById('buscarRota').addEventListener('click', function () {
      const waypts = [];
      clientService.getClients().subscribe(res => {
        const checkboxArray = res;
        for (let i = 0; i < checkboxArray.length; i++) {
          waypts.push({
            location: checkboxArray[i].endereco,
            stopover: true
          });
        }
        const start = document.getElementById('start') as HTMLInputElement;
        directionsService.route({
          origin: start.value,
          destination: checkboxArray[checkboxArray.length - 1].endereco,
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: 'DRIVING'
        }, function (response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            const route = response.routes[0];
            const summaryPanel = document.getElementById('directions-panel');
            summaryPanel.innerHTML = '';
            // For each route, display summary information.
            for (let i = 0; i < route.legs.length; i++) {
              const routeSegment = i + 1;
              summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                '</b><br>';
              summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
              summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
              summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
            }
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      });
    });



    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        infoWindow.setPosition(pos);
        infoWindow.setContent('Sua localizacao');
        infoWindow.open(map);
        map.setCenter(pos);
        geocoder.geocode({ 'location': pos }, function (results, status) {
          if (status === 'OK') {
            if (results[0]) {
              address.emit(results[0]['formatted_address']);
            }
          }
        });
      }, function () {
        this.handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      this.handleLocationError(false, infoWindow, map.getCenter());
    }
    this.map = map;
  }
  ngOnInit() {
    this.initMap();
  }

}
