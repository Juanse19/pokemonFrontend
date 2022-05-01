import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Pokemon } from "./../../../models/pokemon.interface";
import { of } from "rxjs/internal/observable/of";
import { Observable } from "rxjs/internal/Observable";
import { HttpService } from '../../../../@core/backends/shared/api/http.service';


@Injectable()
export class PokemonService {
  // private baseUrl = "https://super-crud.herokuapp.com/pokemon";
  constructor(private http: HttpClient,
              private api: HttpService,) {}

  getPokemons(): Observable<Pokemon[]> {
    return this.http
      .get<Pokemon[]>(this.api.baseUrlAPI)
      .pipe(
        map(data => data),
        catchError(this.handleError("getPokemons", []))
      );
  }

  getPokemonById(id: string): Observable<Pokemon> {
    const url = `${this.api.baseUrlAPI}/${id}`;
    return this.http
      .get<Pokemon>(url)
      .pipe(catchError(this.handleError<Pokemon>(`getPokemonById = ${id}`)));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updatePokemon(pokemon: Pokemon): Observable<any> {
    const url = `${this.api.baseUrlAPI}/${pokemon["_id"]}`;
    return this.http
      .put(url, pokemon)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .pipe(catchError(this.handleError<any>("updatePokemon")));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deletePokemon(id: string): Observable<any> {
    const url = `${this.api.baseUrlAPI}/${id}`;
    return this.http
      .delete(url)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .pipe(catchError(this.handleError<any>("deletePokemon")));
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http
      .post(this.api.baseUrlAPI, pokemon)
      .pipe(catchError(this.handleError<Pokemon>("addPokemon")));
  }


  private handleError<T>(operation = "operation", result?: T) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
