# Pokémon Eggs
[![angularversion](https://img.shields.io/badge/%40angular%2Fcli-1.4.7-orange.svg)](https://github.com/angular/angular-cli)
[![pokeapiversion](https://img.shields.io/badge/Pok%C3%A9API-v2-red.svg)](https://pokeapi.co/)
<img src="src/assets/images/PokemonEggsLogoMini.png" align="right">

A really simple Angular 2 web application that you can use to manage your Pokémon eggs hatching and see relevant information.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.1.

## Table of Contents
- [Requirements](#requirements)
- [Setup](#setup)
    * [Development server](#development-server)
    * [Code scaffolding](#code-scaffolding)
    * [Build](#build)
    * [Running unit tests](#running-unit-tests)
    * [Further help](#further-help)
- [Usage](#usage)
- [Author](#author)

## Requirements
Because i made this project with Angular CLI you need to have a Node 6.9.0 or higher and npm 3 or higher. Also keep in mind that i'm using [PokéAPI](https://pokeapi.co/)  to get all Pokémon info.

## Setup
Clone or download this repository and run `npm install` to install the necessary modules when you are done follow the Angular CLI instructions: 
### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Usage
You can do a few interesting things with this web application, but remember that is really basic and doesn't have any kind of persistence so be sure you save your team JSON.
### Add Pokémon to your Team
You can select all kind of Pokémon that you want to hatch, all you need to do is search them by their name and the just click in the add button.

### Manage your Pokémon
Once you added Pokémon to your team or how i like yo call it, babycrib, then you can edit the Pokémon characteristic to be clear of what exactly you are looking for. Also you can count all the eggs you have hatched. 

To keep information you can download a JSON file wi your team and when you want it you can also upload it.
## Author

* [Juliana Diaz](https://github.com/julidr)
