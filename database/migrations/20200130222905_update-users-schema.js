
exports.up = async function(knex) {
    
    await knex.schema.dropTableIfExists('users');

    await knex.schema.createTable('users', users => {
      users.increments();
  
      users
        .string('username', 255)
        .notNullable()
        .unique();
      users.string('password', 255).notNullable();
      users.string('is_farmer', 1).notNullable();
    });
  };
  
  exports.down = async function(knex, Promise) {
    await knex.schema.dropTableIfExists('users');
  };