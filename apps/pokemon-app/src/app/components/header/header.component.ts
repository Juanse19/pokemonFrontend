import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PokemonAddComponent } from '../pokemon-add/pokemon-add.component';

@Component({
  selector: 'pokemon-front-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(PokemonAddComponent, {
      width: '30%',
    });
  }


}
