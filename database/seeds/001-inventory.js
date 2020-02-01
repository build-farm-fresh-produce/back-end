
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('inventory').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('inventory').insert([
        {
          farm_id: 1,
          product_id: 1,
          quantity_in_stock: 12
        }
      ]);
    });
};
