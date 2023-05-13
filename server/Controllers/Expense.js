const conn = require("../db/conn");

const addExpCategory = async (req, res) => {
    console.log("Reached");

    const { expCategory, expSubCategory } = req.body;
    console.log(expCategory, expSubCategory);

    const q =
        "insert into expense_category (e_category, e_subcategory) values (?, ?)";

    conn.query(q, [expCategory, expSubCategory], (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
            console.log("Category Added Successfully");
        }
    });
};

const getExpCategory = async (req, res) => {
    console.log("REached");
    const q = "select * from expense_category";
    conn.query(q, (err, data) => {
        if (err) return res.json(err);
        console.log(data);
        return res.json(data);
    });
};

const deleteExpCategory = async (req, res) => {
    const id = req.params.id;
    const q = "delete from expense_category where id = ?";

    conn.query(q, [id], (err, data) => {
        if (err) return res.json({ error: 1 });
        return res.json(data), console.log(data);
    });
};

const addExpenses = async (req, res) => {
    const values = [
        req.body.etitle,
        req.body.edisc,
        req.body.edate,
        req.body.eexpenseby,
        req.body.echeckcash,
        req.body.ereceived,
        req.body.categoryid,
    ];

    const q =
        "insert into expense_master (`e_title`, `e_disc`, `e_date`, `e_expense_by`, `e_check_cash`, `e_received`, `category_id`) values (?) ";

    conn.query(q, [values], (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
            console.log(data);
        }
    });
};

const getExpenses = async (req, res) => {
    const q =
        "select *, DATE_FORMAT(DATE(e_date), '%Y-%m-%d')  AS e_date from expense_master";

    conn.query(q, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
            console.log(data);
        }
    });
};




const getGenerateExpenses = async (req, res) => {
    const q =
        "select  `e_title`, `e_disc`, `e_expense_by`, `e_check_cash`, sum(e_received) as e_received, `category_id`, DATE_FORMAT(DATE(e_date), '%Y-%m-%d')  AS e_date from expense_master group by category_id";

    conn.query(q, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
            console.log("*******************");
            console.log(data);
            console.log("*******************");

        }
    });
};

const deleteExpenses = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const q = "delete from expense_master where id = ? ";

    conn.query(q, [id], (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
            console.log(data);
        }
    });
};

const getPerExpenses = async (req, res) => {
    const id = req.params.id;

    const q =
        "select *, DATE_FORMAT(DATE(e_date), '%Y-%m-%d') AS e_date from expense_master where id = ?";

    conn.query(q, [id], (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
            console.log(data);
        }
    });
};

const editExpenses = async (req, res) => {

    const { id, etitle, edisc, edate, eexpenseby, echeckcash, ereceived, categoryid } = req.body;

    const q =
        "UPDATE expense_master SET e_title = ?, e_disc = ?, e_date = ?, e_expense_by = ?, e_check_cash = ?, e_received = ?, category_id = ? WHERE id = ? ";

    conn.query(
        q,
        [etitle, edisc, edate, eexpenseby, echeckcash, ereceived, categoryid, id],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send(result);
        }
    );

};

module.exports = {
    addExpCategory,
    getExpCategory,
    deleteExpCategory,
    addExpenses,
    getExpenses,
    deleteExpenses,
    getPerExpenses,
    editExpenses,
    getGenerateExpenses
};
