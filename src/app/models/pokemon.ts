import {PokemonForm} from './pokemonForm';

export class Pokemon {
    id: number;
    name: string;
    hatched: boolean;
    nature: string;
    eggsHatched: number;
    isShiny: boolean;
    position: number;
    specie: string;
    sex: string;
    ability: string;
    abilities: Array<string>;
    forms: Array<PokemonForm>
}

