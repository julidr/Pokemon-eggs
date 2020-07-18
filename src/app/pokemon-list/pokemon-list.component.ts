import { Component, OnInit, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonService } from './../services/pokemon.service';
import { Pokemon } from './../models/pokemon';

import { MaterializeAction } from 'angular2-materialize';
import { PokemonForm } from 'app/models/pokemonForm';

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
                this.pokemonService.getPokemonById((i + 1)).subscribe(
                  data3 => {
                    var poke = {
                      id: data3['id'],
                      name: data3['species'].name,
                      hatched: false,
                      nature: 'Hardy',
                      eggsHatched: 0,
                      isShiny: false,
                      position: 0,
                      specie: data3['species'].name,
                      sex: gender,
                      ability: "",
                      abilities: this.getAbilitiesName(data3['abilities']),
                      forms: this.getPokemonForms(data3['species'].name, data3['sprites'], data3['types'])
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

  /**
   * Get the array of abilities name of a Pokemon
   * @param abilities list to extract their name
   */
  getAbilitiesName(abilities: Array<any>) {
    let abilitiesName = [];
    for (let i = 0; i < abilities.length; i++) {
      abilitiesName.push(abilities[i]['ability'].name);
    }
    return abilitiesName;
  }


  getPokemonForms(name: string, sprites: Array<any>, types: Array<any>) {
    let pokemonForms = [];
    let defaultForm = {
      "region": "default",
      "sprites": {
        "normal": sprites['front_default'],
        "shiny": sprites['front_shiny'],
        "female": sprites['front_female'] == null ? "" : sprites['front_female']
      },
      "type1": types[0].type.name,
      "type2": types[1] == undefined ? "" : types[1].type.name
    }
    pokemonForms.push(defaultForm);
    // Get other forms
    this.pokemonService.getPokemonForms().subscribe(
      form => {
        let otherForm = form[name];
        if (otherForm != undefined) {
          let alolaForm = otherForm[0]
          pokemonForms.push(alolaForm);
        }
      }
    )
    return pokemonForms;
  }

}
