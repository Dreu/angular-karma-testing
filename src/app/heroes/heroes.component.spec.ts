import { HeroService } from "../hero.service";
import { Hero } from "../hero";
import { HeroesComponent } from "./heroes.component"
import { of } from "rxjs";

describe('HeroesComponent', () => {

    let hereosComponent: HeroesComponent;
    let HEREOS: Hero[];
    let mockHereosService;

    beforeEach(() => {
        HEREOS = [
            {id: 1, name: "Sam", strength: 100},
            {id: 2, name: "Sin", strength: 80},
            {id: 3, name: "Siw", strength: 70},
            {id: 4, name: "Sel", strength: 50},
        ]

        mockHereosService = jasmine.createSpyObj(["getHeroes", "addHero", "deleteHero"]);
        hereosComponent = new HeroesComponent(mockHereosService);
    })


    it('should remove hero when component delete methode is called', () => {
        mockHereosService.deleteHero.and.returnValue(of(true));
        hereosComponent.heroes = HEREOS;

        hereosComponent.delete(HEREOS[2]);

        expect(hereosComponent.heroes.length).toEqual(3);
    })

    it('should call remove service when component delete methode is called', () => {
        mockHereosService.deleteHero.and.returnValue(of(true));
        hereosComponent.heroes = HEREOS;

        hereosComponent.delete(HEREOS[2]);

        expect(mockHereosService.deleteHero).toHaveBeenCalledWith(HEREOS[2]);
    })
})