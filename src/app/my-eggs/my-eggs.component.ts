import { Component, OnInit, EventEmitter } from '@angular/core';
import { Pokemon } from './../models/pokemon';
import { PokemonService } from './../services/pokemon.service';
import {MaterializeDirective,MaterializeAction} from "angular2-materialize";
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
  babyCribFilter: any = {name: '', hatched: ''};
  pokeEdit: Pokemon = new Pokemon;
  isWriting: boolean = false;
  sortDirection: string = 'asc';
  sortFields: Array<string> = ['All', 'Currently Hatching', 'Hatched'];
  sexFields: Array<string> = ['Male', 'Female'];
  modalActions1 = new EventEmitter<string|MaterializeAction>();
  params = [];
  natures: Array<any> = [];
  abilities: Array<any> = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.babyCrib = this.pokemonService.getBabyCrib();
    /*var poke = new Pokemon;
    poke.name = "Bulbasaur";
    poke.id = 1;
    poke.sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png";
    poke.hatched = false;
    poke.isShiny = false;
    poke.nature = "Bold";
    poke.eggsHatched = 10;
    poke.position = 1;
    poke.specie = "Bulbasaur";
    poke.sex = false;
    poke.ability = "Clorofilia";
    this.babyCrib.push(poke)*/
    if(this.pokemonService.getNaturesList().length == 0){
      this.pokemonService.getNatures().subscribe(
        data => {
          this.natures = data;
          this.pokemonService.setNaturesList(this.natures);
        }
      );
    } else {
      this.natures = this.pokemonService.getNaturesList();
    }
  }

  drawRadar(){

  }

  onKey(value){
    if(value==''){
      this.isWriting = false;
    }
    else {
      this.isWriting= true;
    }
  }

  selectValue(value: string){
    if(value=='Hatched'){
      this.babyCribFilter.hatched = true;

    } else if(value=='Currently Hatching'){
      this.babyCribFilter.hatched = false;
    } else {
      this.babyCribFilter.hatched = '';
    }
  }

  selectValueSex(value: string){
    if(value=='Female'){
      this.pokeEdit.sex=true;

    } else {
      this.pokeEdit.sex=false;
    }
  }

  deletePokemon(i: number){
    this.pokemonService.deletePokemon(i);
  }

  openModal(poke: Pokemon){
    this.pokeEdit = poke;
    this.pokemonService.getAbilitiesById(this.pokeEdit.id).subscribe(
      myData => this.abilities = myData 
    );
    this.modalActions1.emit({action:"modal",params:['open']});
  }

}
