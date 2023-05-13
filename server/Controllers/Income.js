const conn = require("../db/conn");


const addIncomeCategory = async (req, res) => {
    console.log("REached");
    const values = [
        req.body.incomeCategory,
        req.body.incomeSubCategory
    ]

    console.log(values);

    const q = "insert into income_category (i_category, i_subcategory) values (?, ?)";

    conn.query(q, values, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
            console.log(data);
        }
    })
}

const getIncomeCategory = async (req, res) => {
    const q = "select * from income_category";

    conn.query(q, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
            console.log(data);
        }
    })
}

const deleteIncomeCategory = async (req, res) => {
    const id = req.params.id;

    const q = "delete from income_category where id = ?";

    conn.query(q, [id], (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
            console.log(data);
        }
    })
}

const addIncome = async (req, res) => {
    const values = [
        req.body.ititle,
        req.body.idisc,
        req.body.idate,
        req.body.icollectedby,
        req.body.ipayments,
        req.body.ireceived,
        req.body.categoryid
    ]

    const q = "insert into income_master (`i_title`, `i_disc`, `i_date`, `i_collected_by`, `i_payments`, `i_received`, `category_id`) values (?) ";

    conn.query(q, [values], (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
            console.log(data);
        }
    })
}

const getIncome = async (req, res) => {
    const q =
        "select *, DATE_FORMAT(DATE(i_date), '%Y-%m-%d')  AS i_date from income_master";

    conn.query(q, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
            console.log(data);
        }
    });
}

const deleteIncome = async (req, res) => {
    const id = req.params.id;

    const q = "delete from income_master where id = ?";

    conn.query(q, id, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
            console.log(data);
        }
    })
}

const getPerIncome = async (req, res) => {
    const id = req.params.id;

    const q = "select *, DATE_FORMAT(DATE(i_date), '%Y-%m-%d') AS i_date from income_master where id = ?";

    conn.query(q, [id], (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
            console.log(data);
        }
    })
}

const editIncome = async (req, res) => {
    const { id, ititle, idisc, idate, icollectedby, ipayments, ireceived, categoryid } = req.body;

    const q = "UPDATE income_master SET i_title = ?, i_disc = ?, i_date = ?, i_collected_by = ?, i_payments = ?, i_received = ?, category_id = ? WHERE id = ? ";

    conn.query(q, [ititle, idisc, idate, icollectedby, ipayments, ireceived, categoryid, id], (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
            console.log(data);
        }
    })
}

module.exports = {
    addIncomeCategory,
    getIncomeCategory,
    deleteIncomeCategory,
    addIncome,
    getIncome,
    deleteIncome,
    getPerIncome,
    editIncome,
};
