const conn = require("../db/conn")




const addClan = async (req, res) => {
    console.log("REached");
    const q = "insert into clan (`clan_name`, `parent_clan`) values (?)";
    
    const values = [
        req.body.clanName,
        req.body.parentClan,
    ]

    conn.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
}

const getClan = async (req, res) => {
    console.log("REached");
    const q = 'select * from clan';
    conn.query(q, (err, data) => {
        if (err) return res.json(err)
        console.log(data);
        return res.json(data);
    })
}


const deleteClan = async (req, res) => {
    const id = req.params.id
    const q = "delete from clan where id = ?"

    conn.query(q, [id], (err, data) => {
        if (err) return res.json({ error: 1 })
        return res.json(data), console.log(data);
    })
}

module.exports = { addClan, getClan, deleteClan }