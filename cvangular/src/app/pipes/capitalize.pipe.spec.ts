import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CapitalizePipe]
    });

    pipe = TestBed.inject(CapitalizePipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform correctly', () => {
    expect(pipe.transform('hello')).toBe('Hello');
    expect(pipe.transform('HELLO')).toBe('Hello');
    expect(pipe.transform('hElLo')).toBe('Hello');
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform('a')).toBe('A');
    expect(pipe.transform('A')).toBe('A');
    expect(pipe.transform('angular')).toBe('Angular');
    expect(pipe.transform('Angular')).toBe('Angular');
  });
});
