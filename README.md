# singers-challenge

## Task 1
### Main page
![](samples/main.png)

### Result
![](samples/basic-result.png)

### One Singer Term (ed)
![](samples/term-ed.png)

### Limit 1
![](samples/limit-1.png)

### Shortened
![](samples/shortened.png)

### Term (ed) limit 1 shortened
![](samples/term-ed-limit-1-shortened.png)

## Task 2
### MongoDB Query
> db.items.aggregate( [ { $unwind: "$sizes" }, { $group: { "_id": { $toUpper: "$sizes" }, "averagePrice": { $avg: "$price" } } }, { $sort: { "averagePrice": -1 } } ] )