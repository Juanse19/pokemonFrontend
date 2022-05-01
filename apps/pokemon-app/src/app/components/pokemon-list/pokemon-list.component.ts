import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../../@core/backends/shared/services/pokemon.service';
import { Pokemon } from '../../@core/models/pokemon.interface';
import Swal from "sweetalert2";
import { MessageService } from '../../@core/backends/shared/services/messaje.service';
import { Subscription, takeWhile } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'pokemon-front-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {

  private alive=true;
  public pokemons: Pokemon[];
  subscription: Subscription;

  @Input() pokemonId:Pokemon;

  constructor(
              private pokemonService: PokemonService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog)
              {
                this.loadDataPokemons();
              }



  ngOnInit(): void {
    this.getPokemons();
  }

  loadDataPokemons(){
    this.subscription = this.messageService.onMessage()
    .pipe(takeWhile(() => this.alive))
    .subscribe(message => {
      if (message.text=="PokemonSave") {

        this.getPokemons();

      }
    });
   }

  getPokemons(): void {
    setTimeout(() => {
      this.pokemonService.getPokemons().subscribe(data => {
        this.pokemons = data;
        console.log('data', this.pokemons);

        // this.cdr.detectChanges();
      });
    });
  }


  deletePokemon(pokemon: Pokemon): void {

    Swal.fire({
      title: 'Are you sure?',
      text: "A Pokémon will be eliminated!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.pokemonService.deletePokemon(pokemon["_id"]).subscribe(() => {
          this.getPokemons();
          // this.globals.loading = false;
        });

        Swal.fire(
          'Deleted!',
          'the pokemon has been eliminated.',
          'success'
        )
      }
    })


  }

  ngOnDestroy(): void {
    this.alive = false;
  }


}
