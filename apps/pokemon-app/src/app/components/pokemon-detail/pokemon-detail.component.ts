import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../@core/backends/shared/services/pokemon.service';
import { Pokemon } from '../../@core/models/pokemon.interface';
import { Location } from "@angular/common";

@Component({
  selector: 'pokemon-front-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit {

  private alive=true;
  public pokemon: Pokemon;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private pokemonService: PokemonService,) {}

  ngOnInit(): void {
    this.getPokemonDetails();
  }

  getPokemonDetails(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.pokemonService.getPokemonById(id).subscribe(data => {
      this.pokemon = data;
    });
  }

  updatePokemon(): void {
    this.pokemonService.updatePokemon(this.pokemon).subscribe(() => {
      this.goBack();
    });
  }

  goBack(): void {
    this.location.back();
  }

  goBackPokemon() {
    this.router.navigate(['/pokemons'],{skipLocationChange: true});
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
