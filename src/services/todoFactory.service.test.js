import { TodoFactoryService } from './todo-factory.service';

describe('toDoFactory', () => {

  describe('create toDo', () => {
    it('should return object when property is not undefined', () => {

      const result = TodoFactoryService.createTodo('test');

      expect(result.id).toBeDefined();
      expect(result.name).toBe('test');
      expect(result.isCompleted).toBe(false);
    });
  });

  describe('default toDo', () => {
    it('should return object when property is empty', () => {

      expect(TodoFactoryService.defaultTodo()).toMatchObject({ id: null, name: '', isCompleted: false });
    });
  });
});
