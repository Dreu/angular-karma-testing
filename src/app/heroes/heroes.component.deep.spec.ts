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

    it('should retender each hero as a heroComponent ', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEREOS));

        fixture.detectChanges();

        const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentDEs.length).toEqual(4);
        expect(heroComponentDEs[0].componentInstance.hero.name).toEqual('Sam');
    })

    it(` should call heroService deleteHero when the Hero Component's
        delete button is clicked`, () => {

            spyOn(fixture.componentInstance, 'delete');
            mockHeroService.getHeroes.and.returnValue(of(HEREOS));

            fixture.detectChanges();

            const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
            //heroComponents[0].query(By.css('button'))
            //    .triggerEventHandler('click', { stopPropagation: () => {}});
            //(<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);
            heroComponents[0].triggerEventHandler('delete', null);
            
            expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEREOS[0])
    })

    it('should add a new Hero to hero list when the add button is clicked', () => {

        mockHeroService.getHeroes.and.returnValue(of(HEREOS));
        fixture.detectChanges();
        const name = "Mr AQ";
        mockHeroService.addHero.and.returnValue(of({ id: 6, name: name, strength: 100 }));

        const inputElement = fixture.debugElement.query(By.css("input")).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css("button"))[0];

        inputElement.value = name;
        addButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
        expect(heroText).toContain(name);
    })
})