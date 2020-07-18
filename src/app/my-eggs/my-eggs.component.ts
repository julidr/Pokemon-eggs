import { Component, OnInit, EventEmitter } from '@angular/core';
import { Pokemon } from './../models/pokemon';
import { PokemonService } from './../services/pokemon.service';
import { MaterializeAction } from "angular2-materialize";
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-my-eggs',
  templateUrl: './my-eggs.component.html',
  styleUrls: ['./my-eggs.component.css']
})
export class MyEggsComponent implements OnInit {

  babyCrib: Array<Pokemon> = [];
  babyCribFilter: any = { name: '', hatched: '' };
  pokeEdit: Pokemon = new Pokemon;
  isWriting: boolean = false;
  sortDirection: string = 'asc';
  sortFields: Array<string> = ['All', 'Currently Hatching', 'Hatched'];
  sexFields: Array<string> = ['Male', 'Female'];
  modalActions1 = new EventEmitter<string | MaterializeAction>();
  textAreaActions = new EventEmitter<string | MaterializeAction>();
  params = [];
  natures: Array<any> = [];
  abilities: Array<any> = [];
  formFields: Array<any> = [];
  downloadPokemonJSON: any;
  femalePokemon: Array<any> = [];
  malePokemon: Array<any> = [];
  genderlessPokemon: Array<any> = [];
  selectedRegion: string;

  constructor(private pokemonService: PokemonService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    $(window).on("load resize", () => {
      if ($(window).width() <= 760) {
        $(".natureChip").addClass("col s12 center")
      }
      if ($(window).width() > 760) {
        $(".natureChip").removeClass("col s12 center")
      }
    });
    this.babyCrib = this.pokemonService.getBabyCrib();
    this.femalePokemon = this.pokemonService.getFemaleOnlyList();
    this.malePokemon = this.pokemonService.getMaleOnlyList();
    if (this.pokemonService.getNaturesList().length == 0) {
      this.pokemonService.getNatures().subscribe(
        data => {
          this.natures = data;
          this.pokemonService.setNaturesList(this.natures);
        }
      );
    } else {
      this.natures = this.pokemonService.getNaturesList();
    }
    if (this.pokemonService.getGenderlessList().length == 0) {
      this.pokemonService.getGenderlessPokemon().subscribe(
        data2 => {
          for (var j = 0; j < 77; j++) {
            this.genderlessPokemon.push(data2[j].pokemon_species.name);
          }
          this.pokemonService.setGenderlessList(this.genderlessPokemon);
        }
      );
    } else {
      this.genderlessPokemon = this.pokemonService.getGenderlessList();
    }
    this.downloadJson();
  }

  downloadJson() {
    let pokemonJSON = JSON.stringify(this.babyCrib);
    let uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(pokemonJSON));
    this.downloadPokemonJSON = uri;
  }

  updateForms() {
    console.log(this.selectedRegion);
    console.log(this.formFields);
    let previousActive = 0;
    let newActive = 0;
    for (let i = 0; i < this.formFields.length; i++) {
      if (this.formFields[i]['active'] == true) {
        previousActive = i;
      }
      if (this.formFields[i]['region'] == this.selectedRegion) {
        newActive = i;
      }
    }
    this.formFields[previousActive]['active'] = false;
    this.formFields[newActive]['active'] = true;
    this.downloadJson();
  }

  loadJson(value: string) {
    this.babyCrib = JSON.parse(value);
    this.pokemonService.setBabyCrib(this.babyCrib);
    $('#textarea1').val('');
    $('#textarea1').trigger('autoresize');
  }

  onKey(value) {
    if (value == '') {
      this.isWriting = false;
    }
    else {
      this.isWriting = true;
    }
  }

  selectValue(value: string) {
    if (value == 'Hatched') {
      this.babyCribFilter.hatched = true;

    } else if (value == 'Currently Hatching') {
      this.babyCribFilter.hatched = false;
    } else {
      this.babyCribFilter.hatched = '';
    }
  }

  getSexFields(name: string) {
    if (this.femalePokemon.includes(name)) {
      return ["Female"];
    } else if (this.malePokemon.includes(name)) {
      return ["Male"];
    } else if (this.genderlessPokemon.includes(name)) {
      return ["Genderless"];
    } else {
      return ['Male', 'Female'];
    }
  }

  getActiveRegion() {
    for (let i = 0; i < this.formFields.length; i++) {
      if (this.formFields[i]['active'] == true) {
        return this.formFields[i]['region']
      }
    }
  }

  deletePokemon(i: number) {
    this.pokemonService.deletePokemon(i);
  }

  openModal(poke: Pokemon) {
    this.pokeEdit = poke;
    this.sexFields = this.getSexFields(this.pokeEdit.specie);
    this.abilities = this.pokeEdit.abilities;
    this.formFields = this.pokeEdit.forms;
    this.selectedRegion = this.getActiveRegion();
    this.modalActions1.emit({ action: "modal", params: ['open'] });
  }

}
