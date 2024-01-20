process.env.NODE_ENV = 'test';
const request = require('supertest')
const app = require('./app')
let items = require('./fakeDb')

let cake = {name: 'cake', price: '5.99'}


beforeEach(function() {
    items.push(cake);
});

afterEach(function() {
    items.length = 0;
});


describe("GET /items", () => {
    test('Get list of items', async () => {
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({items: [cake]});
    })
})


describe("POST /items", () => {
    test('Adding a new item', async () => {
        const resp = await request(app).post('/items').send({name: 'chocolate', price: '2.00'});
        expect(resp.statusCode).toBe(201);
        expect(resp.body.item).toEqual([{name: 'chocolate', price: '2.00'}])
    })

})

describe("GET /items/:name", () => {
    test('Get single item by name', async () => {
        const resp = await request(app).get(`/items/${cake.name}`)
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({name: 'cake', price:'5.99'})
    })
})

describe("PATCH /items/:name", () => {
    test('Update an items name', async () => {
        const resp = await request(app).patch(`/items/${cake.name}`).send({name: "brownie"});
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({item: {name: 'brownie', price:'5.99'}})
    })
})

describe("DELETE /items/:name", () => {
    test('Delete an item', async () => {
        console.log('cake', cake.name)
        const resp = await request(app).delete(`/items/${cake.name}`)
        console.log('cake after deletion', cake.name)
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({message: 'Deleted'})
    })
})
