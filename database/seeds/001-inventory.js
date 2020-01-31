
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('inventory').del()
    .then(function () {
      // Inserts seed entries
      return knex('inventory').insert([
        {
          farm_id: 1,
          product_id: 1,

        
        },
        {
          farm_id: 2,
          product_id: 2, 
          colName: 'rowValue3'}
      ]);
    });
};
