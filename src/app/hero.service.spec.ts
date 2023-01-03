import { inject, TestBed } from "@angular/core/testing"
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"

describe('HeroService', () => {
    let mockHMessageService: any;
    let httpTestingController: HttpTestingController;
    let heroService: HeroService;

    beforeEach(() => {
        mockHMessageService = jasmine.createSpyObj(["add"]);

        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [
                HeroService,
                { provide: MessageService, useValue: mockHMessageService }
            ]
        })

        httpTestingController = TestBed.inject(HttpTestingController);
        //let msgService = TestBed.inject(MessageService);
        heroService = TestBed.inject(HeroService);
    })


    describe('getHeroes', () => {

        it('should call get with the correct Url', () => {
            // Call getHero
            heroService.getHero(4).subscribe();

            // assertions
            const req = httpTestingController.expectOne('api/heroes/4');
            req.flush({id: 4, name: "Sel", strength: 50});
            expect(req.request.method).toBe('GET');
            httpTestingController.verify();
        })
    })

})