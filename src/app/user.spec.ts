import { User } from './user';

describe('User', () => {
  it('should accept values in the constructor', () => {
    const user = new User({
      id: '1',
      name: 'name',
      picture: 'picture'
    });
    expect(user.id).toEqual('1');
    expect(user.name).toEqual('name');
    expect(user.picture).toEqual('picture');
  });
});
