import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import IDisplayHeroes from '@/app/domain/ports/i-display-users';

import { UserSearchComponent } from './user-search.component';

describe('UserSearchComponent', () => {
  let component: UserSearchComponent;
  let fixture: ComponentFixture<UserSearchComponent>;
  let spyIDisplayHeroes: jasmine.SpyObj<IDisplayHeroes>;

  beforeEach(async () => {
    spyIDisplayHeroes = jasmine.createSpyObj(
      'IDisplayHeroesSearch',
      ['askHeroesFiltered'],
      { users: [] }
    );
    spyIDisplayHeroes.askHeroesFiltered.and.returnValue(of());

    await TestBed.configureTestingModule({
      declarations: [UserSearchComponent],
      providers: [
        { provide: 'IDisplayHeroesSearch', useValue: spyIDisplayHeroes },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ask heroes search on input', waitForAsync(() => {
    let input = fixture.debugElement.nativeElement.querySelector('#search-box');
    input.value = 'search_string';
    input.dispatchEvent(new Event('input'));

    fixture.whenStable().then(() => {
      expect(spyIDisplayHeroes.askHeroesFiltered).toHaveBeenCalledOnceWith(
        'search_string'
      );
    });
  }));
});
