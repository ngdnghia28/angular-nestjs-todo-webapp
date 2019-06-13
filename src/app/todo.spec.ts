import { Todo } from './todo';
import { User } from './user';

describe('User', () => {
  let user: User;
  let anotherUser: User;

  beforeEach(() => {
    user = new User();
    anotherUser = new User();
  });

  it('should accept values in the constructor', () => {
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 86400000 * 2);
    const todo = new Todo({
      name: 'name',
      startDate,
      endDate,
      effort: 2,
      assignedUser: anotherUser,
      user
    });
    expect(todo.id).toEqual('hello');
    expect(todo.name).toEqual('name');
    expect(todo.startDate).toEqual(startDate);
    expect(todo.endDate).toEqual(endDate);
    expect(todo.effort).toEqual(2);
    expect(todo.assignedUser).toEqual(anotherUser);
    expect(todo.user).toEqual(user);
  });
});
