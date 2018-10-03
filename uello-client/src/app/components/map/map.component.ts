import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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
  constructor() { }

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
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -23.5759577, lng: -46.5887472 },
      zoom: 11
    });
    const geocoder = new google.maps.Geocoder;
    const infoWindow = new google.maps.InfoWindow;
    const directionsService = new google.maps.DirectionsService;
    const directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(map);

    document.getElementById('start').addEventListener('change',
      () => {
        directionsService.route({
          origin: document.getElementById('start').value,
          destination: document.getElementById('end').value,
          travelMode: 'DRIVING'
        }, function (response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      });
    document.getElementById('end').addEventListener('change', () => {
      directionsService.route({
        origin: document.getElementById('start').value,
        destination: document.getElementById('end').value,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
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
