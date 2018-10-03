import { Component, OnInit, Input } from '@angular/core';

import { ClientService } from '../../services/client/client.service';
import { Client } from '../../models/client';


declare var jquery: any;
declare var $: any;
declare var google: any;
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
  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(res => {
      if (res.length > 0) {
        this.endAddr = res;
      }
    });

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
    const end = document.getElementById('end') as HTMLInputElement;
    this.addrNew['endereco'] = end.value;
    this.showModalMap(this.addrNew, 'Nmap');
    $('#modalNew').modal('open');
  }

  saveNewAddr() {
    const nome = document.getElementById('nomee') as HTMLInputElement;
    const email = document.getElementById('email') as HTMLInputElement;
    const datanasc = document.getElementById('datanasc') as HTMLInputElement;
    const cpf = document.getElementById('cpf') as HTMLInputElement;

    this.addrNew['nome'] = nome.value;
    this.addrNew['email'] = email.value;
    this.addrNew['datanasc'] = datanasc.value;
    this.addrNew['cpf'] = cpf.value;
    this.endAddr.push(this.addrNew);
    const client: Client = {
      id: 0,
      nome: this.addrNew['nome'],
      cpf: this.addrNew['cpf'],
      email: this.addrNew['email'],
      datanasc: this.addrNew['datanasc'],
      endereco: this.addrNew['endereco']
    };
    this.clientService.createClient(client).subscribe(res => {
      console.log(res);
    });
    this.addrNew = {};
  }

  newRoutes(event) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const lines = this.csvJSON(reader.result);
      for (let i = 0; i < lines.length; i++) {
        const client: Client = {
          id: 0,
          nome: lines[i]['nome'],
          cpf: lines[i]['cpf'],
          email: lines[i]['email'],
          datanasc: lines[i]['datanasc'],
          endereco: lines[i]['endereco']
        };
        this.clientService.createClient(client).subscribe(res => {
          console.log(res);
        });
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
