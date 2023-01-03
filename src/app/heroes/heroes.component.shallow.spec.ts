import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component"

describe('HeroesComponent Shallow', () => {

    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEREOS = [
        {id: 1, name: "Sam", strength: 100},
        {id: 2, name: "Sin", strength: 80},
        {id: 3, name: "Siw", strength: 70},
        {id: 4, name: "Sel", strength: 50},
    ]

    @Component({
        selector: 'app-hero',
        template: '<div></div>'
    })
    class FakeHeroComponent {
        @Input() hero: Hero;
    }

    beforeEach(() => {
        mockHeroService = jasmine.createSpyObj(["getHeroes", "addHero", "deleteHero"]);

        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                FakeHeroComponent
            ],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
            //schemas: [NO_ERRORS_SCHEMA]
        })

        fixture = TestBed.createComponent(HeroesComponent);
    });


    it('should set hereos correctly from service', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEREOS));
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(4);
    })

    it('should create one li for each hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEREOS));
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(4);
    })

})