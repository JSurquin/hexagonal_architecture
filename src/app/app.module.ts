import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule, routes } from './components/app-routing.module';

import { AppComponent } from './components/app.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { MessagesComponent } from './components/messages/messages.component';
import { UserAdapterService } from './domain/adapters/user-adapter.service';
import { ArticleAdapterService } from './domain/adapters/article-adapter.service';
import { MessageAdapterService } from './domain/adapters/message-adapter.service';
import UserDetailDisplayer from './domain/user-detail-displayer';
import UsersDisplayer from './domain/users-displayer';
import MessagesDisplayer from './domain/messages-displayer';
import ArticlesDisplayer from './domain/articles-displayer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { postsReducer } from './store/reducers/posts.reducer';
import { usersReducer } from './store/reducers/user.reducer';
import { PostsEffects } from './store/effects/posts.effects';
import { LoginAdapterService } from './domain/adapters/login-adapter.service';
import { UserEffects } from './store/effects/user.effects';

export function loginAdapterServiceFactory(i: any) {
  return i.get('IManageAuthentication');
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forFeature('postState', postsReducer),
    StoreModule.forFeature('userState', usersReducer),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    EffectsModule.forRoot([PostsEffects, UserEffects]),

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    //    HttpClientInMemoryWebApiModule.forRoot(
    //      InMemoryDataService, { dataEncapsulation: false }
    //    )
  ],
  declarations: [
    AppComponent,
    // DashboardComponent,
    // HeroesComponent,
    UserDetailComponent,
    MessagesComponent,
    // UserSearchComponent,
  ],
  providers: [
    // Inject domain classes into components
    { provide: 'IDisplayUserDetail', useClass: UserDetailDisplayer },
    { provide: 'IDisplayUsers', useClass: UsersDisplayer },
    { provide: 'IDisplayUsersSearch', useClass: UsersDisplayer },
    { provide: 'IDisplayMessages', useClass: MessagesDisplayer },
    { provide: 'IDisplayArticles', useClass: ArticlesDisplayer },
    // Inject adapters int domain classes
    { provide: 'IManageAuthentication', useClass: LoginAdapterService },
    { provide: 'IManageUsers', useClass: UserAdapterService },
    { provide: 'IManageMessages', useClass: MessageAdapterService },
    { provide: 'IManageArticles', useClass: ArticleAdapterService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
