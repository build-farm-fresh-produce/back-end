
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('farms').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('farms').insert([
        {
          farm_name: 'Appleseed Farms',
          owner_id: 1,
          address: '123 Main St',
          city: 'Brookly Greens',
          state: 'NY',
          zipcode: '10010',
          phone_number: '2125555555',
          email:'nadaGMO@appleseedfarms.com'
      
      }
        
      ]);
    });
};
