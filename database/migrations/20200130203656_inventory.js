
exports.up = function(knex) {
    return knex.schema.createTable('inventory', item => {
      item.increments();
  
      item.integer('farm_id')
        .unsigned()
        .notNullable();

      item.integer('product_id')
        .unsigned()
        .notNullable();

      item.integer('quantity_in_stock')
        .unsigned()
        .notNullable();

    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('inventory');
  };
  
