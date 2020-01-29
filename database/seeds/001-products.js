
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {
          farm_id: 1,
          product_name: 'Apples',
          description: 'Sold by the pound',
          image_url: 'https://businessnc.com/wp-content/uploads/2018/08/apples-getty-839461454.jpg',
          price: 1.29,
          unit: 'lbs'
        }
        
      ]);
    });
};
