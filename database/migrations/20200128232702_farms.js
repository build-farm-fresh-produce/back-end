exports.up = function(knex) {
    return knex.schema.createTable('farms', farm => {
      farm.increments();
  
      farm
        .string('farm_name', 255)
        .notNullable();
      farm.integer('owner_id')
        .unsigned()
        .notNullable();

      farm.foreign('owner_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      farm.text('address')
        .notNullable();
      farm.text('city')
        .notNullable();
      farm.text('state')
        .notNullable();
      farm.text('zipcode')
        .notNullable();
    
      farm.text('phone_number')
        .notNullable();

      farm.text('email')
        .notNullable();
        
    
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('farms');
  };
  