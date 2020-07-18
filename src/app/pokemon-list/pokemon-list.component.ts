import { Component, OnInit, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonService } from './../services/pokemon.service';
import { Pokemon } from './../models/pokemon';

import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemon: Array<Pokemon> = [];
  pokemonFilter: any = { name: '' };
  isWriting: boolean = false;
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
              if (this.pokemonService.getGenderlessList().length == 0) {
                for (var j = 0; j < data2.length; j++) {
                  this.genderlessPokemonList.push(data2[j].pokemon_species.name);
                }
                this.pokemonService.setGenderlessList(this.genderlessPokemonList);
              } else {
                this.genderlessPokemonList = this.pokemonService.getGenderlessList();
              }
              for (var i = 0; i < data.length; i++) {
                let gender = "Male"
                if (this.femalePokemonList.includes(data[i].name + '')) {
                  gender = "Female";
                }
                if (this.genderlessPokemonList.includes(data[i].name + '')) {
                  gender = "Genderless";
                }
                this.pokemonService.getPokemonById((i+1)).subscribe(
                  data3 => {
                    var poke = {
                      id: data3['id'],
                      name: data3['species'].name + '',
                      sprite: data3['sprites'].front_default,
                      hatched: false,
                      nature: 'Hardy',
                      eggsHatched: 0,
                      isShiny: false,
                      position: 0,
                      specie: data3['species'].name + '',
                      sex: gender,
                      ability: "",
                      abilities: this.getAbilitiesName(data3['abilities']),
                      type1: data3['types'][0].type.name,
                      type2: data3['types'][1] == undefined ? "" : data3['types'][1].type.name
                    }
                    this.pokemon.push(poke);
                  }
                );
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

  /* Receive an array with the abilities of a Pokemon and 
  push them into a single string array with the name of each ability
  */
  getAbilitiesName(abilities: Array<any>) {
    let abilitiesName = [];
    for (let i = 0; i < abilities.length; i++) {
      abilitiesName.push(abilities[i]['ability'].name);
    }
    return abilitiesName;
  }

}
