import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { HeroComponent } from "./hero.component"

describe('HeroCmmponent', () => {

    let fixture: ComponentFixture<HeroComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
        fixture = TestBed.createComponent(HeroComponent);
    });

    it('should have a correct hero', () => {
        fixture.componentInstance.hero = { id: 1, name: "Test", strength: 100 };
        fixture.detectChanges();

        expect(fixture.componentInstance.hero.strength).toEqual(100);
    });

    it('should render heroName in a anchor tag : nativeElement', () => {
        fixture.componentInstance.hero = { id: 1, name: "Gassama", strength: 100 };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('a').textContent).toContain('Gassama');

    });

    it('should render heroName in a anchor tag: DebugElement', () => {

        fixture.componentInstance.hero = { id: 1, name: "Gassama", strength: 100 };
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('a')).nativeElement.textContent).toContain('Gassama');

    })
})