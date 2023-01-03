import { StrengthPipe } from "./strength.pipe"

describe('StrengthPipe', () => {
  let strengthPipe:StrengthPipe;

  beforeEach(() => {
    strengthPipe = new StrengthPipe();
  })

  it( 'should display weak if strength is 5', () => {
    expect(strengthPipe.transform(5)).toEqual("5 (weak)");
  })

  it('should display strong when strength is 10', () => {
    expect(strengthPipe.transform(10)).toEqual("10 (strong)");
  })


  it('should display unbelievable when strength is 100', () => {
    expect(strengthPipe.transform(100)).toEqual("100 (unbelievable)");
  })
})
