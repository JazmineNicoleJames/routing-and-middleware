const express = require('express');
const router = new express.Router();
const ExpressError = require('./expressError')



router.get('/', (req, res) => {
    console.log(req.query)
   return res.json({items});
});


router.post('/', (req, res) => {
    const newItem = [{name: req.body.name, price: req.body.price}];
    items.push(newItem);
    res.status(201).json({ item: newItem });
});

router.get('/:name', (req, res, next) => {
    try {
        const foundItem = items.find(i => i.name === req.params.name);
        if(!foundItem) throw new ExpressError('Invalid item name')
        return res.send(foundItem)
    } catch(e) {
        next(e)
    }
    res.json({item: foundItem})
});

router.patch('/:name', (req, res) => {
    const foundItem = items.find(i => i.name === req.params.name);
    if(foundItem === undefined){
        throw new ExpressError('Item cannot be found', 404)
    }
    foundItem.name = req.body.name;
    res.json({item: foundItem})
})

router.delete('/:name', (req, res) => {
    const foundItemIdx = items.findIndex(i => i.name === req.params.name);
    if(foundItemIdx === -1){
        throw new ExpressError('Item does not exist.')
    } 
    items.splice(foundItemIdx, 1)
    res.json({ message: "Deleted"})
})

module.exports = router;