# How to use
First you will need to require the package like usual
`const Tablefy = require("tablefy")`

Then create a new tablefy
`let table = new Tablefy()`

Then when you make a query you will use it like so
```
  connection.query("SELECT * FROM sometable", (err,res)=>{
    table.draw(res);
  });
```
