import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    // backticks ( ` ) define a JavaScript template literal for embedding the id
    this.messageService.add(`HeroService: fetched hero id=$(id)`);
    // getHero() has an asynchronous signature,
    // returns a mock hero as an Observable, using the RxJS of() function.
    return of(HEROES.find(hero => hero.id === id ));
  }

  constructor(private messageService: MessageService) { }
}
