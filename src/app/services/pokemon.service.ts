import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Pokemon } from './../pokemon';

import 'rxjs/add/operator/map';

@Injectable()
export class PokemonService {

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
    this.babyCrib.push(pokemon);
  }

  getBabyCrib(){
    return this.babyCrib;
  }
}
