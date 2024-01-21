import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import IDisplayArticles from '@/app/domain/ports/i-display-articles';
import ArticlesComponent from '../articles/articles.component';
import { expect, jest, test } from '@jest/globals';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as postsActions from '../../store/actions/posts.actions';

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
  let spyIDisplaydashboard: {
    askArticles: jest.Mock<any>;
    heroes: any[];
  };
  let mockStore: MockStore;

  beforeEach(waitForAsync(() => {
    spyIDisplaydashboard = {
      askArticles: jest.fn(),
      heroes: [],
    };
    spyIDisplaydashboard.askArticles.mockReturnValue(of());

    TestBed.configureTestingModule({
      // declarations: [ArticlesComponent],
      imports: [ArticlesComponent],
      providers: [
        { provide: 'IDisplayArticles', useValue: spyIDisplaydashboard },
        provideMockStore(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockStore = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('SHOUD ASK LES dashboard BORDEL', async () => {
    expect(component).toBeTruthy();
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(postsActions.loadPosts());
    // const spyAskHeroesList = jest.spyOn(component, 'ngOnInit');
    // component.ngOnInit(); // Appeler la méthode où askHeroesList est censé être appelé
    // expect(spyAskHeroesList).toHaveBeenCalled();

    // expect(spyIDisplaydashboard.askdashboard).toHaveBeenCalled();
  });
});
