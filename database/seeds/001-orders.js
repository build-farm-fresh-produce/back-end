
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('orders').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('orders').insert([
        {
          user_id: 1,
          product_id: 1,
          quantity: 1,
          total: 1.29
        },
        
      ]);
    });
};
