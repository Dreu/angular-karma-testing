import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component"

describe('HereosComponent Deep Test', () => {

    let fixture : ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEREOS = [
        {id: 1, name: "Sam", strength: 100},
        {id: 2, name: "Sin", strength: 80},
        {id: 3, name: "Siw", strength: 70},
        {id: 4, name: "Sel", strength: 50},
    ]

    beforeEach(() => {
        mockHeroService = jasmine.createSpyObj(["getHeroes", "addHero", "deleteHero"]);

        TestBed.configureTestingModule({
            declarations: [ 
                HeroesComponent,
                HeroComponent
            ],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })

        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should retender each hero as a heroCOmponent ', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEREOS));

        fixture.detectChanges();

        const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentDEs.length).toEqual(4);
        expect(heroComponentDEs[0].componentInstance.hero.name).toEqual('Sam');
    })
})