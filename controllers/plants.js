const knex = require('./knex'); // the connection

module.exports = {
  getUserID(username) {
    return knex('users')
      .select('id')
      .where('username', username);
  },

  getAllUserTodos(username) {
    const user_id = knex('users').select('id').where('username', username);
    return knex('users')
      .join('todo', 'users.id', '=', 'todo.user_id')
      .where('user_id', user_id);
  },

  createNewTodo(username, todo) {
    const user_id = knex('users').select('id').where('username', username);
    todo.user_id = user_id;
    return knex('todo')
      .insert(todo);
  },

  /* Ensures todo belongs to user */
  getTodoByID(username, id){
    const user_id = knex('users').select('id').where('username', username);
    return knex('todo')
      .join('users', 'todo.user_id', '=', 'users.id')
      .where('todo.user_id', user_id)
      .where('todo.id', id);
  },

  update(username, id, content, completed){
    const user_id = knex('users').select('id').where('username', username);
    // const validateUser = knex('todo').join('users', 'todo.user_id', '=', 'users.id').where('todo.user_id', user_id).where('todo.id', id);
    return knex('todo')
      .where('id', id)
      .update({content: content, completed: completed});
  },

  delete(username, id) {
    const user_id = knex('users').select('id').where('username', username);
    // const validateUser = knex('todo').join('users', 'todo.user_id', '=', 'users.id').where('todo.user_id', user_id).where('todo.id', id);
    return knex('todo')
      .join('users', 'todo.user_id', '=', 'users.id')
      .where('todo.user_id', user_id)
      .where('todo.id', id)
      .del();
  },
};