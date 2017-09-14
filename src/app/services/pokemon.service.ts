import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Pokemon } from './../pokemon';

import 'rxjs/add/operator/map';

@Injectable()
export class PokemonService {

  public newPokemonSubject = new Subject<any>();
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

  addPokemon(pokemon: Pokemon){
    this.newPokemonSubject.next(pokemon);
  }
}
