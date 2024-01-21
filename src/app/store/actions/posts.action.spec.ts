// posts.actions.spec.ts

import * as postsActions from './posts.actions';

describe('Posts Actions', () => {
  it('should create the loadPosts action', () => {
    const action = postsActions.loadPosts();

    // Assurez-vous que le type de l'action est correct
    expect(action.type).toEqual('[Posts Page] Load Posts');

    // Vous pouvez également vérifier d'autres propriétés de l'action si nécessaire
    // Par exemple, si votre action a une propriété payload, vous pouvez vérifier comme ceci :
    // expect(action.payload).toEqual(expectedPayload);
  });
});
