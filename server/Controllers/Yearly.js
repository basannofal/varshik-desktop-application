const conn = require("../db/conn")




const addYear = async (req, res) => {
    console.log("REached");
    const q = "insert into yearly_income ( `amount`, `year_date`) values (?)";

    const values = [
        req.body.amount,
        req.body.yearDate,
    ]

    conn.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
}

const getYear = async (req, res) => {
    const q = 'select * from yearly_income';
    conn.query(q, (err, data) => {
        if (err) return res.json(err)
        console.log(data);
        return res.json(data);
    })
}


const deleteYear = async (req, res) => {
    const id = req.params.id
    const q = "delete from yearly_income where id = ?"

    conn.query(q, [id], (err, data) => {
        if (err) return res.json({ error: 1 })
        return res.json(data)
    })
}

module.exports = { getYear, addYear, deleteYear }