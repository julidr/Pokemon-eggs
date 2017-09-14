import { Component, OnInit } from '@angular/core';
import { Pokemon } from './../pokemon';
import { PokemonService } from './../services/pokemon.service';
import { Http } from '@angular/http';

import { NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-my-eggs',
  templateUrl: './my-eggs.component.html',
  styleUrls: ['./my-eggs.component.css']
})
export class MyEggsComponent implements OnInit {

  babyCrib: Array<Pokemon> = [];
  babyCribFilter: any = {name: ''};
  isWriting: boolean = false;
  sortFields: Array<string> = ['All', 'Currently Hatching', 'Hatched'];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.babyCrib = this.pokemonService.getBabyCrib();
  }

  onKey(value){
    if(value==''){
      this.isWriting = false;
    }
    else {
      this.isWriting= true;
    }
  }

}
