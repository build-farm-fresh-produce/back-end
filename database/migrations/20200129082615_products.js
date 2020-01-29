exports.up = function(knex) {
    return knex.schema.createTable('products', products => {
      products.increments();
  
      products.integer('farm_id')
        .unsigned()
        .notNullable();

    //   products.foreign('farm_id')
    //     .references('id')
    //     .inTable('farms')
    //     .onUpdate('CASCADE')
    //     .onDelete('CASCADE');

      products
        .text('product_name')
        .notNullable();

      products.text('description')
        .notNullable();

      products.text('image_url')
        .notNullable();

      products.float('price')
        .notNullable();

      products.text('unit')
        .notNullable();


    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('products');
  };
  
