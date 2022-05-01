import { Component, OnInit } from '@angular/core';
import { Pokemon } from './../../@core/models/pokemon.interface';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { PokemonService } from '../../@core/backends/shared/services/pokemon.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from "sweetalert2";
import { MessageService } from '../../@core/backends/shared/services/messaje.service';


@Component({
  selector: 'pokemon-front-pokemon-add',
  templateUrl: './pokemon-add.component.html',
  styleUrls: ['./pokemon-add.component.scss'],
})
export class PokemonAddComponent implements OnInit {



  private alive=true;
  PokemonForm!: FormGroup

  constructor(private pokemonSvc: PokemonService,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private dialogRef: MatDialogRef<PokemonAddComponent>) {}

  ngOnInit(): void {
    this.PokemonForm = this.formBuilder.group({
      name: ['', Validators.required],
      evolves_from: ['', Validators.required],
      image: ['', Validators.required],
    })
  }

  addPokemon() {

    if (this.PokemonForm.valid) {


      this.pokemonSvc.addPokemon(this.PokemonForm.value).subscribe({
        next:(res)=>{

          Swal.fire({
            icon: "success",
            timer: 2000,
            text: "¡Pokemon added seccessfully!",
          });
          this.messageService.sendMessage('PokemonSave');
          this.PokemonForm.reset();
          this.dialogRef.close();
        },
        error:()=>{

          Swal.fire({
            icon: "warning",
            timer: 2000,
            text: "¡Erro while adding!",
          });
        }
      });

      }
    }


  ngOnDestroy(): void {
    this.alive = false;
  }

}
