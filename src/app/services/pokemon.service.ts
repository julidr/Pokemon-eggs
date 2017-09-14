import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Pokemon } from './../pokemon';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';

@Injectable()
export class PokemonService {

  private index: number = 0;
  public newPokemonSubject = new Subject<any>();
  private babyCrib: Array<Pokemon> = [];
  private baseSpriteUrl: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  constructor(private http: Http) { }

  getAllPokemon(){
    return this.http.get('http://pokeapi.co/api/v2/pokemon-species/?limit=721').map(res=>res.json().results);
  }

  getPokemonSprite(number: string){
    return this.http.get('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+number+'png');
  }
  
  getPokemonByName(name: string){
    return this.http.get('http://pokeapi.co/api/v2/pokemon/'+name).map(res=>res.json().results);
  }

  getPokemonById(id: number){
    return this.http.get('http://pokeapi.co/api/v2/pokemon/'+id).map(res=>res.json().results);
  }

  addPokemon(pokemon: Pokemon){
    var poke = new Pokemon;
    poke.name = pokemon.name;
    poke.id = pokemon.id;
    poke.sprite = pokemon.sprite;
    poke.hatched = pokemon.hatched;
    poke.isShiny = pokemon.isShiny;
    poke.nature = pokemon.nature;
    poke.eggsHatched = pokemon.eggsHatched;
    poke.position = this.index;
    this.babyCrib.push(poke);
    this.index = this.index+1;
  }

  deletePokemon(pokemonIndex: number){
    for(var i = 0; i<this.babyCrib.length; i++){
      if(this.babyCrib[i].position == pokemonIndex){
        this.babyCrib.splice(i,1);
      }
    }
  }

  getBabyCrib(){
    return this.babyCrib;
  }

  getNatures(){
    return this.http.get('http://pokeapi.co/api/v2/nature/').map(res=>res.json().results);
  }
}
