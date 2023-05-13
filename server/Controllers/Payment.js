const conn = require("../db/conn");

const getPaymentHistory = async (req, res) => {
    console.log("reached ")
    const query = "SELECT p.* , DATE_FORMAT(DATE(payment_date), '%Y-%m-%d') AS payment_date, m.f_name,m.m_name,m.l_name FROM `payment` as p JOIN member as m on p.member_id=m.id ORDER BY p.id desc";
    conn.query(query, (err, data) => {
        if (err) { return res.json(err) }
        return res.json(data)

    })

}


const getPaymentInfo = async (req, res) => {

    console.log("reaced at handler")
    console.log(req.params.id)
    const query = "select p.*, DATE_FORMAT(DATE(p.payment_date), '%Y-%m-%d')  as payment_date_format, m.f_name,m.m_name,m.l_name from payment as p JOIN member as m on p.member_id=m.id where p.id=?  "
    conn.query(query, [req.params.id], (err, data) => {
        if (err) { return res.json(err) }
        console.log(data)
        return res.json(data)
    })

}

const updatePayment = async (req, res) => {
    const values = [
        req.body.paymentAmount,
        req.body.collectedBy,
        req.body.bookNo,
        req.body.voucherNo,
        req.body.paymentDate,
        req.params.id,
    ]

    console.log(values)

    const query = "UPDATE `payment` SET `pay_amount`=?,`collected_by`=?,`book_no`=?,`voucher_no`=?,`payment_date`=? WHERE id=?"
    conn.query(query, values, (err, data) => {
        if (err) { return res.json(err) }

        return res.json(data)
    })
}


const deletePayment = (req, res) => {
    const query = "DELETE from payment WHERE id=?";
    conn.query(query, [req.params.id], (err, data) => {
        if (err) { return res.json(err) }

        return res.json(data)
    })
}

module.exports = { getPaymentHistory, getPaymentInfo, updatePayment, deletePayment }