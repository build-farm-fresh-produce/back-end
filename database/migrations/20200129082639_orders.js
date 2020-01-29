exports.up = function(knex) {
    return knex.schema.createTable('orders', orders => {
        orders.increments();
  
        orders.integer('user_id')
        .unsigned()
        .notNullable();

        // orders.foreign('user_id')
        // .references('id')
        // .inTable('users')
        // .onUpdate('CASCADE')
        // .onDelete('CASCADE');

        orders.integer('product_id')
        .unsigned()
        .notNullable();

        // orders.foreign('product_id')
        // .references('id')
        // .inTable('products')
        // .onUpdate('CASCADE')
        // .onDelete('CASCADE');

        orders
        .float('quantity')
        .notNullable();

        orders
        .float('total')
        .notNullable();


    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('orders');
  };
  
