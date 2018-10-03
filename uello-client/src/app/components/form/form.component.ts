import { Component, OnInit, Input } from '@angular/core';
import * from 'jquery';

declare var $: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() address;
  endAddr = [];
  file;
  addrSelected = {};
  addrNew = {};
  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      $('select').formSelect();
      $('#modalView').modal();
      $('#modalNew').modal();
    });
  }

  csvJSON(csv) {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(';');
    for (let i = 1; i < lines.length; i++) {

      const obj = {};
      const currentline = lines[i].split(';');
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);

    }
    return result; // JavaScript object
  }
  addNewAddr() {
    this.addrNew['endereco'] = document.getElementById('end').value;
    this.showModalMap(this.addrNew, 'Nmap');
    $('#modalNew').modal('open');
  }

  saveNewAddr() {
    this.addrNew['nome'] = document.getElementById('nome').value
    this.addrNew['email'] = document.getElementById('email').value
    this.addrNew['datanasc'] = document.getElementById('datanasc').value
    this.addrNew['cpf'] = document.getElementById('cpf').value
    this.endAddr.push(this.addrNew);
    this.addrNew = {};
  }

  newRoutes(event) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const lines = this.csvJSON(reader.result);
      for (let i = 0; i < lines.length; i++) {
        this.endAddr.push(lines[i]);
      }
    };
    reader.readAsText(this.file);
  }

  viewAddr(addr) {
    this.addrSelected = addr;
    this.showModalMap(addr, 'Smap');
  }

  showModalMap(addr, maplocation) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'address': addr['endereco']
    }, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        const myOptions = {
          zoom: 16,
          center: results[0].geometry.location,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        const map = new google.maps.Map(document.getElementById(maplocation), myOptions);
        const marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      }
    });
  }
}
