import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonAddComponent } from './components/pokemon-add/pokemon-add.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

const routes: Routes = [
  // {
  //   path: 'pages',
  //   loadChildren: () => import('./pages/pages.module')
  //     .then(m => m.PagesModule),
  // },

  // { path: '**', redirectTo: 'pages', pathMatch: 'full' },

  {
    path: "pokemons",
    component: PokemonListComponent
  },
  {
    path: "pokemons/detail/:id",
    component: PokemonDetailComponent
  },
  {
    path: "pokemons/add",
    component: PokemonAddComponent
  },
  {
    path: "",
    redirectTo: "/pokemons",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
