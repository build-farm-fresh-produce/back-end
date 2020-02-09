//Supertest is a library to help test endpoints
const supertest = require('supertest');

//remember our server won't actually start
//due to the if statement in index.js
const server = require('./api/server');

const Auth = require('./auth/auth-model');

userId = ''

test("Welcome Route", async () => {

    //Passing our server gives us an 
    //instance of our server to we 
    //can make http requests
    const result = await supertest(server).get("/")

    //does it return the expected status code?

    expect(result.status).toBe(200)

    // //does it return the expected data format?

    expect(result.type).toBe("application/json")

    // //does it return the expected data?

    expect(result.body.message).toBe("Welcome To Farm Fresh Produce!")

    await Auth.truncate('users');

    await Auth.truncate('farms');
})



//First Test

// beforeEach(async () => {
//     // this function executes and clears out the table before each test
//     await Auth.truncate('users');
// });


test("Register Route", async () => {

    const data = {
        "username":"charlito",
        "password":"valentina",
        "is_farmer":"y"
    }

    const result = await supertest(server).post("/api/auth/register").send(data);

    expect(result.body.username).toBe(data.username)

    expect(result.status).toBe(201)

    userId = result.body.id
    
    expect(userId).toBe(1)
})


//Second Test 

test("Login Route", async () => {

    const data = {
        "username":"charlito",
        "password":"valentina"
    }
    const result = await supertest(server).post("/api/auth/login").send(data);

    expect(result.body.message).toBe("Welcome charlito, have a token...!")
    
    token = result.body.token 

    expect(result.status).toBe(200)

    // console.log(token)

})


//Third Test

test("Adding Farm Data", async () => {
    
    const farmData = {

        "farm_name":"Banarama Garden",
        "owner_id":userId,
        "address":"123 Main St",
        "city":"New York",
        "state":"NY",
        "zipcode":"10010",
        "phone_number":"2125551212",
        "email":"chiquita@banaramagarden.com"


    }
    const result = await supertest(server).post("/api/farms").set('authorization',token).send(farmData);

    expect(result.status).toBe(201)

    // console.log(result)

    expect(result.text).toBe("[1]")

    

})


//Third Test

test("Adding a Product", async () => {
    
    const productData = {

        "farm_id":1,
        "product_name":"Oranges",
        "description":"Florida's best",
        "image_url":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTh09TiNZeokKL1_p9DUkC2VMfCA66E3adDVMTzKvcQy-inlTJd",
        "price":0.69,
        "unit":"lbz",
        "quantity_in_stock":26

    }

    const result = await supertest(server).post("/api/products").set('authorization',token).send(productData);

    expect(result.status).toBe(201)

    // console.log(result)

    expect(result.body.product_name).toBe("Oranges")

})


