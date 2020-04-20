const knex = require('./knex'); // the connection

module.exports = {
  getAllUserGardens(id){
    return knex('gardens')
    .where('user_id', id)
    .orderBy('id')
    
  },

  createGarden(garden_name, user_id){
    return knex('gardens')
    .insert({ 
      garden_name,
      user_id
    })
  },

  // getPlantsFromGarden(garden_id, user_id){
  //   const garden = knex('plants')
  //   .where('garden_id', garden_id)
    
  //   const permission = knex('gardens').where('user_id', user_id)
  //   .orderBy('id')
  // },

  // getPlantID(id) {
  //   return knex('plants')
  //     .select('id')
  //     .where('username', username);
  // },

  // getAllUserTodos(username) {
  //   const user_id = knex('plants').select('id').where('username', username);
  //   return knex('plants')
  //     .join('todo', 'plants.id', '=', 'todo.user_id')
  //     .where('user_id', user_id);
  // },

  // createNewTodo(username, todo) {
  //   const user_id = knex('plants').select('id').where('username', username);
  //   todo.user_id = user_id;
  //   return knex('todo')
  //     .insert(todo);
  // },

  // /* Ensures todo belongs to user */
  // getTodoByID(username, id){
  //   const user_id = knex('plants').select('id').where('username', username);
  //   return knex('todo')
  //     .join('plants', 'todo.user_id', '=', 'plants.id')
  //     .where('todo.user_id', user_id)
  //     .where('todo.id', id);
  // },

  // update(username, id, content, completed){
  //   const user_id = knex('plants').select('id').where('username', username);
  //   // const validateUser = knex('todo').join('plants', 'todo.user_id', '=', 'plants.id').where('todo.user_id', user_id).where('todo.id', id);
  //   return knex('todo')
  //     .where('id', id)
  //     .update({content: content, completed: completed});
  // },

  // delete(username, id) {
  //   const user_id = knex('plants').select('id').where('username', username);
  //   // const validateUser = knex('todo').join('plants', 'todo.user_id', '=', 'plants.id').where('todo.user_id', user_id).where('todo.id', id);
  //   return knex('todo')
  //     .join('plants', 'todo.user_id', '=', 'plants.id')
  //     .where('todo.user_id', user_id)
  //     .where('todo.id', id)
  //     .del();
  // },
};