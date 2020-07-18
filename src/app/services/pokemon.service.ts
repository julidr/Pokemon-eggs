import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from './../models/pokemon';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';

@Injectable()
export class PokemonService {

  private index: number = 0;
  public newPokemonSubject = new Subject<any>();
  private babyCrib: Array<Pokemon> = [];
  private pokemonList: Array<Pokemon> = [];
  private naturesList: Array<any> = [];
  femaleOnlyList: Array<any> = ["blissey", "bounsweet", "chansey", "cresselia", "flabebe", "floette", "florges", "froslass", "happiny", "illumise", "jynx", "kangaskhan", "latias", "lilligant", "mandibuzz", "miltank", "nidoqueen", "nidoran-f", "nidorina", "petilil", "salazzle", "smoochum", "steenee", "tsareena", "vespiquen", "vullaby", "wormadam"];
  maleOnlyList: Array<any> = ["braviary", "gallade", "hitmonchan", "hitmonlee", "hitmontop", "landorus", "latios", "mothim", "nidoking", "nidoran-m", "nidorino", "rufflet", "sawk", "tauros", "throh", "thundurus", "tornadus", "tyrogue", "volbeat"];
  genderlessList: Array<any> = [];
  private baseSpriteUrl: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  constructor(private http: HttpClient) { }

  getAllPokemon() {
    return this.http.get('https://pokeapi.co/api/v2/pokemon-species/?limit=807', { responseType: 'json' }).map(res => res['results']);
  }

  setAllPokemon(allPokemon: Array<Pokemon>) {
    this.pokemonList = allPokemon;
  }

  getPokemonList() {
    return this.pokemonList;
  }

  setNaturesList(allNatures: Array<any>) {
    this.naturesList = allNatures;
  }

  getNaturesList() {
    return this.naturesList;
  }

  getPokemonById(id: number) {
    return this.http.get('https://pokeapi.co/api/v2/pokemon/' + id);
  }

  addPokemon(pokemon: Pokemon) {
    var poke = new Pokemon;
    poke.name = pokemon.name;
    poke.id = pokemon.id;
    poke.sprite = pokemon.sprite;
    poke.hatched = pokemon.hatched;
    poke.isShiny = pokemon.isShiny;
    poke.nature = pokemon.nature;
    poke.eggsHatched = pokemon.eggsHatched;
    poke.position = this.index;
    poke.specie = pokemon.specie;
    poke.sex = pokemon.sex;
    poke.ability = pokemon.ability;
    poke.abilities = pokemon.abilities;
    poke.type1 = pokemon.type1,
    poke.type2 = pokemon.type2
    this.babyCrib.push(poke);
    this.index = this.index + 1;
  }

  deletePokemon(pokemonIndex: number) {
    for (var i = 0; i < this.babyCrib.length; i++) {
      if (this.babyCrib[i].position == pokemonIndex) {
        this.babyCrib.splice(i, 1);
      }
    }
  }

  getBabyCrib() {
    return this.babyCrib;
  }

  setBabyCrib(myBabyCrib: Array<Pokemon>) {
    this.babyCrib = myBabyCrib;
    this.index = this.babyCrib.length;
  }

  getNatures() {
    return this.http.get('https://pokeapi.co/api/v2/nature/').map(res => res['results']);
  }

  getFemaleOnlyList() {
    return this.femaleOnlyList;
  }

  getMaleOnlyList() {
    return this.maleOnlyList;
  }

  getGenderlessPokemon() {
    return this.http.get('https://pokeapi.co/api/v2/gender/3/').map(res => res['pokemon_species_details']);
  }

  setGenderlessList(myGenderless: Array<any>) {
    this.genderlessList = myGenderless;
  }

  getGenderlessList() {
    return this.genderlessList;
  }

}
