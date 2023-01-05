import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from "@angular/core/testing"
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component"
import { Location } from "@angular/common"
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

describe('HeroDetailComponent', ()=> {

    let fixture: ComponentFixture<HeroDetailComponent>;
    let mockHeroService, mockActivatedRoute, mockLocation;

    beforeEach(() => {
        mockActivatedRoute = {
            snapshot: { paramMap: { get: () => { return '3'; }}}
        }
        mockHeroService = jasmine.createSpyObj(["getHero", "updateHero"]);
        mockLocation = jasmine.createSpyObj(["back"]);

        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [
                HeroDetailComponent
            ],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: HeroService, useValue: mockHeroService },
                { provide: Location, useValue: mockLocation }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroDetailComponent);
        mockHeroService.getHero.and.returnValue(of({id: 3, name: "Test", strength: 100 }));
    });

    it('should render hero name in a h2 tag', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('TEST');
    })


    it('should call updateHero when save is called', fakeAsync(() => {

        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();
        tick(250);
        //flush(); Alternative

        expect(mockHeroService.updateHero).toHaveBeenCalled();
    }));
})