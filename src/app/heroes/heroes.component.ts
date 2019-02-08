import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if(!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      })
  }

  delete(hero: Hero): void {
    // Although the component delegates hero deletion to the HeroService, it remains responsible for updating its own list of heroes.
    // The component's delete() method immediately removes the hero-to-delete from that list, anticipating that the HeroService will succeed on the server.
    // There's really nothing for the component to do with the Observable returned by heroService.delete(). It must subscribe, otherwise
    // the service will not send the delete request to the server! As a rule, an Observable does nothing until something subscribes!
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }



}
