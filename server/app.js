const express = require('express')
const app = express()
const conn = require('./db/conn')
const bodyparser = require('body-parser');
const path = require('path')
const cors = require('cors')
const Clan_route = require("./Routes/Clan")
const Member_route = require("./Routes/Member")
const Yearly_route = require("./Routes/Yearly")
const Payment_route = require("./Routes/Payment")
const Expense_route = require("./Routes/Expense");
const Income_route = require("./Routes/Income")

app.use(express.json())
app.use(cors())
// app.use(express.static(__dirname + '/server/uploads'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));



app.use("/", Clan_route);
app.use("/", Member_route);
app.use("/", Yearly_route);
app.use("/", Payment_route);
app.use("/", Expense_route);
app.use("/", Income_route);


app.listen(8000, () => {
    console.log("Server Created");
})