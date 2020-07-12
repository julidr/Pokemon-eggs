import { Component, OnInit, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonService } from './../services/pokemon.service';
import { Pokemon } from './../models/pokemon';

import { NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemon: Array<Pokemon> = [];
  pokemonFilter: any = { name: '' };
  isWriting: boolean = false;
  private baseSpriteUrl: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  globalActions = new EventEmitter<string | MaterializeAction>();
  femalePokemonList: Array<any> = [];
  malePokemonList: Array<any> = [];
  genderlessPokemonList: Array<any> = [];

  constructor(private http: HttpClient,
    private pokemonService: PokemonService,
  ) { }

  ngOnInit() {

    if (this.pokemonService.getPokemonList().length == 0) {
      this.pokemonService.getAllPokemon().subscribe(
        data => {
          this.pokemonService.getGenderlessPokemon().subscribe(
            data2 => {
              this.femalePokemonList = this.pokemonService.getFemaleOnlyList();
              this.malePokemonList = this.pokemonService.getMaleOnlyList();
              var idValue = 0;
              if(this.pokemonService.getGenderlessList().length == 0){
                for(var j = 0; j < 77; j++){
                  this.genderlessPokemonList.push(data2[j].pokemon_species.name);
                }
                this.pokemonService.setGenderlessList(this.genderlessPokemonList);
              } else {
                this.genderlessPokemonList = this.pokemonService.getGenderlessList();
              }
              for (var i = 0; i < 721; i++) {
                idValue = idValue + 1;
                let gender = "Male"
                if(this.femalePokemonList.includes(data[i].name+'')){
                  gender = "Female";
                } 
                if (this.genderlessPokemonList.includes(data[i].name+'')){
                  gender = "Genderless";
                }
                var poke = {
                  id: idValue,
                  name: data[i].name + '',
                  sprite: this.baseSpriteUrl + idValue + '.png',
                  hatched: false,
                  nature: 'Hardy',
                  eggsHatched: 0,
                  isShiny: false,
                  position: 0,
                  specie: data[i].name + '',
                  sex: gender,
                  ability: ""
                }
                this.pokemon.push(poke);
              }
              this.pokemonService.setAllPokemon(this.pokemon);
            }
          );
        }
      );
    } else {
      this.pokemon = this.pokemonService.getPokemonList();
    }
  }

  onKey(value) {
    if (value == '') {
      this.isWriting = false;
    }
    else {
      this.isWriting = true;
    }
  }

  addPokemon(poke: Pokemon) {
    this.pokemonService.addPokemon(poke);
  }

}
