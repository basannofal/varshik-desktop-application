const conn = require("../db/conn");

// const checkRollNo = async (rollno) => {

// }

const updateMember = async (req, res) => {
  const query =
    "UPDATE member set `roll_no`=?, `f_name`=?, `m_name`=?, `l_name`=?, `g_f_name`= ?, `g_m_name`= ?, `g_l_name`= ?,  `join_date`=?, `pre_entry`=?, `clanid`=?, `m_number`=?  WHERE id=?";

  const values = [
    req.body.rollno,
    req.body.fname,
    req.body.mname,
    req.body.lname,
    req.body.gfname,
    req.body.gmname,
    req.body.glname,
    req.body.jdate,
    req.body.preEntry,
    req.body.clanid,
    req.body.mobileNumber,
    req.body.id,
  ];

  conn.query(query, values, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

const getMemberListByFilter = async (req, res) => {

  const clanData = req.body;
  console.log(clanData);
  const clanId = clanData.selectedClanId;
  const isSubClan = clanData.isClanChecked;
  let q;
  if (isSubClan) {
    q =
      "SELECT  ROW_NUMBER() OVER (ORDER BY m.id DESC) AS index_num, m.id AS id, m.roll_no AS roll_no, m.f_name AS f_name, m.m_name AS m_name, m.l_name AS l_name, m.g_f_name AS g_f_name, m.g_m_name AS g_m_name, m.g_l_name AS g_l_name,  DATE_FORMAT(DATE(m.join_date), '%d-%m-%Y') AS join_date, m.pre_entry, m.clanid, c.parent_clan, COALESCE ( p.total_paid, 0) AS total_paid, COALESCE(y.varshik, 0) AS total_debit FROM member m LEFT JOIN (SELECT member_id, SUM(pay_amount) AS total_paid FROM payment GROUP BY member_id) p ON m.id = p.member_id LEFT JOIN (SELECT m.id, SUM(y.amount) AS varshik FROM member m LEFT JOIN yearly_income y ON m.join_date <= y.year_date GROUP BY m.id) y ON m.id = y.id  LEFT JOIN clan c ON m.clanid = c.id  WHERE m.clanid IN (?,(SELECT id FROM clan WHERE parent_clan =? ) )  ORDER BY m.clanid,m.roll_no ASC";
    conn.query(q, [clanId, clanId], (err, data) => {
      // if (err) throw res.json(err);
      return res.json(data);
    });
  } else {
    q =
      "SELECT m.id AS id, m.roll_no AS roll_no, m.f_name AS f_name, m.m_name AS m_name, m.l_name AS l_name,m.g_f_name AS g_f_name, m.g_m_name AS g_m_name, m.g_l_name AS g_l_name, DATE_FORMAT(DATE(m.join_date), '%d-%m-%Y') AS join_date, m.pre_entry, m.clanid, COALESCE ( p.total_paid, 0) AS total_paid, COALESCE(y.varshik, 0) AS total_debit FROM member m LEFT JOIN (SELECT member_id, SUM(pay_amount) AS total_paid FROM payment GROUP BY member_id) p ON m.id = p.member_id LEFT JOIN ( SELECT m.id, SUM(y.amount) AS varshik FROM member m LEFT JOIN yearly_income y ON m.join_date <= y.year_date GROUP BY m.id) y ON m.id = y.id where m.clanid=? ORDER BY m.roll_no ASC";
    conn.query(q, clanId, (err, data) => {
      // if(err) throw res.json(err);
      return res.json(data);
    });
  }
};

const addMember = async (req, res) => {
  // var rno = req.body.rollno;
  // const q = 'SELECT * FROM `member` WHERE roll_no = ?'
  // conn.query(q, [rno], (err, data) => {
  //     if (data.length === 0) {
  //         const insert_q = "insert into member (`roll_no`, `f_name`, `m_name`, `l_name`, `join_date`, `pre_entry`, `clanid`) values (?)";

  //         const values = [
  //             req.body.rollno,
  //             req.body.fname,
  //             req.body.mname,
  //             req.body.lname,
  //             req.body.jdate,
  //             req.body.preEntry,
  //             req.body.clanid,

  //         ]

  //         conn.query(insert_q, [values], (err, data) => {
  //             if (err) return res.json(err)
  //             return res.json(data)
  //         })
  //     } else {
  //         console.log("availabel");
  //         return res.status(401).json({ error: "Roll Number Already Assigned" });
  //     }
  // })

  console.log("********REached*************");
  const q =
    "insert into member (`roll_no`, `f_name`, `m_name`, `l_name`, `g_f_name`, `g_m_name`, `g_l_name`, `join_date`, `pre_entry`, `clanid`, `m_number`) values (?)";

  const values = [
    req.body.rollno,
    req.body.fname,
    req.body.mname,
    req.body.lname,
    req.body.gfname,
    req.body.gmname,
    req.body.glname,
    req.body.jdate,
    req.body.preEntry,
    req.body.clanid,
    req.body.mobileNumber
  ];

  conn.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

const getMember = async (req, res) => {
  // const q = 'SELECT  m.id as id, m.roll_no as roll_no, m.f_name as f_name, m.m_name as m_name, m.l_name as l_name, m.join_date as join_date, m.clanid, sum(p.pay_amount) AS total_paid FROM member m JOIN payment p ON m.id = p.member_id group by p.member_id, p.pay_amount';

  // const q = 'SELECT  m.id as id, m.roll_no as roll_no, m.f_name as f_name, m.m_name as m_name, m.l_name as l_name, m.join_date as join_date, m.clanid, sum(p.pay_amount) AS total_paid, sum(y.amount) as total_debit FROM member m left JOIN payment p ON m.id = p.member_id left JOIN yearly_income y ON y.year_date >= m.join_date group by p.member_id, y.amount, y.year_date  ORDER BY m.roll_no ASC';

  // const q = 'SELECT  m.id as id, m.roll_no as roll_no, m.f_name as f_name, m.m_name as m_name, m.l_name as l_name, m.join_date as join_date, m.pre_entry, m.clanid, sum(p.pay_amount) AS total_paid, sum(y.amount) as total_debit  FROM member m left JOIN payment p ON m.id = p.member_id left JOIN yearly_income y ON y.year_date >= m.join_date group by m.id, p.member_id, m.join_date  ORDER BY m.roll_no ASC';

  
  const q =
    "SELECT ROW_NUMBER() OVER (ORDER BY m.id DESC) AS index_num, m.id AS id, m.roll_no AS roll_no, m.f_name AS f_name, m.m_name AS m_name, m.l_name AS l_name, m.g_f_name AS g_f_name, m.g_m_name AS g_m_name, m.g_l_name AS g_l_name, DATE_FORMAT(DATE(m.join_date), '%d-%m-%Y')  AS join_date, m.pre_entry, m.clanid, COALESCE ( p.total_paid, 0) AS total_paid, COALESCE(y.varshik, 0) AS total_debit FROM member m LEFT JOIN (SELECT member_id, SUM(pay_amount) AS total_paid FROM payment GROUP BY member_id) p ON m.id = p.member_id LEFT JOIN ( SELECT m.id, SUM(y.amount) AS varshik FROM member m LEFT JOIN yearly_income y ON m.join_date <= y.year_date GROUP BY m.id) y ON m.id = y.id ORDER BY m.id DESC;";

  conn.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    console.log(data);
    return res.json(data);
  });
};

const getMemberBySelectedDate = async (req, res) => {
  const selectedDate=req.params.selectedDate;
  // const q = 'SELECT  m.id as id, m.roll_no as roll_no, m.f_name as f_name, m.m_name as m_name, m.l_name as l_name, m.join_date as join_date, m.clanid, sum(p.pay_amount) AS total_paid FROM member m JOIN payment p ON m.id = p.member_id group by p.member_id, p.pay_amount';

  // const q = 'SELECT  m.id as id, m.roll_no as roll_no, m.f_name as f_name, m.m_name as m_name, m.l_name as l_name, m.join_date as join_date, m.clanid, sum(p.pay_amount) AS total_paid, sum(y.amount) as total_debit FROM member m left JOIN payment p ON m.id = p.member_id left JOIN yearly_income y ON y.year_date >= m.join_date group by p.member_id, y.amount, y.year_date  ORDER BY m.roll_no ASC';

  // const q = 'SELECT  m.id as id, m.roll_no as roll_no, m.f_name as f_name, m.m_name as m_name, m.l_name as l_name, m.join_date as join_date, m.pre_entry, m.clanid, sum(p.pay_amount) AS total_paid, sum(y.amount) as total_debit  FROM member m left JOIN payment p ON m.id = p.member_id left JOIN yearly_income y ON y.year_date >= m.join_date group by m.id, p.member_id, m.join_date  ORDER BY m.roll_no ASC';

  const q =
  `SELECT  ROW_NUMBER() OVER (ORDER BY m.id DESC) AS index_num, m.id AS id, m.roll_no AS roll_no, m.f_name AS f_name, m.m_name AS m_name, m.l_name AS l_name, m.g_f_name AS g_f_name, m.g_m_name AS g_m_name, m.g_l_name AS g_l_name, DATE_FORMAT(DATE(m.join_date), '%d-%m-%Y') AS join_date, m.pre_entry, m.clanid, COALESCE(SUM(CASE WHEN p.payment_date <= '${selectedDate}' THEN p.pay_amount ELSE 0 END), 0) AS total_paid, COALESCE(y.varshik, 0) AS total_debit FROM member m LEFT JOIN payment p ON m.id = p.member_id LEFT JOIN ( SELECT m.id, SUM( CASE WHEN y.year_date <= '${selectedDate}' THEN y.amount ELSE 0 END) AS varshik FROM member m LEFT JOIN yearly_income y ON m.join_date <= y.year_date GROUP BY m.id ) y ON m.id = y.id WHERE m.join_date <= '${selectedDate}' GROUP BY m.id, m.roll_no, m.f_name, m.m_name, m.l_name, m.g_f_name, m.g_m_name, m.g_l_name, join_date, m.pre_entry, m.clanid, y.varshik ORDER BY m.id DESC;`
   
  console.log(q);

  conn.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    console.log(data);
    return res.json(data);
  });
};

const getSingleMember = async (req, res) => {
  const q = "SELECT   m.id AS id, m.roll_no AS roll_no, m.f_name AS f_name, m.m_name AS m_name, m.l_name AS l_name, DATE_FORMAT(DATE(m.join_date), '%d-%m-%Y')  AS join_date, m.pre_entry, m.clanid, COALESCE ( p.total_paid, 0) AS total_paid, COALESCE(y.varshik, 0) AS total_debit FROM member m LEFT JOIN (SELECT member_id, SUM(pay_amount) AS total_paid FROM payment GROUP BY member_id) p ON m.id = p.member_id LEFT JOIN ( SELECT m.id, SUM(y.amount) AS varshik FROM member m LEFT JOIN yearly_income y ON m.join_date <= y.year_date GROUP BY m.id) y ON m.id = y.id ORDER BY m.id DESC LIMIT 1";

  conn.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    console.log(data);
    return res.json(data);
  });
};

// const getDebit = async (req, res) => {
//   const q = "SELECT f_name FROM member WHERE id > 3";

//   conn.query(q, (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.json(err);
//     }
//     console.log(data);
//     return res.json(data);
//   });
// };

const getPerMember = async (req, res) => {
  console.log("parameter is  ");
  const grno = req.params.grno;
  const q =
    "SELECT *,DATE_FORMAT(DATE(join_date), '%Y-%m-%d')  AS join_date_format FROM member WHERE id = ?";
  conn.query(q, [grno], (err, data) => {
    if (err) return res.json(err);
    // console.log(data);
    return res.json(data);
  });
};



const getPerMemberByRollNo = async (req, res) => {
  console.log("parameter is  ");
  const id = req.params.id;
  const q =
    "SELECT *,DATE_FORMAT(DATE(join_date), '%Y-%m-%d')  AS join_date_format FROM member WHERE id = ?";
  conn.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    // console.log(data);
    return res.json(data);
  });
};

const deleteMember = async (req, res) => {
  const id = req.params.id;
  const q = "delete from member where id = ?";

  conn.query(q, [id], (err, data) => {
    if (err) return res.json({ error: 1 });
    return res.json(data);
  });
};

const addPayment = async (req, res) => {
  const memberid = req.params.memberid;
  const rollno = req.params.rollno;
  console.log(memberid);
  console.log(rollno);

  const q =
    "insert into payment (`member_id`, `roll_no`, `pay_amount`, `collected_by`, `book_no`, `voucher_no`, `payment_date`) values (?)";

  const values = [
    req.body.memberId,
    req.body.rollNo,
    req.body.paymentAmount,
    req.body.collectedBy,
    req.body.bookNo,
    req.body.voucherNo,
    req.body.paymentDate,
  ];

  conn.query(q, [values], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ error: "Incorrect Roll No" });
    }
    return res.json(data);
  });
};

module.exports = {
  getMember,
  getSingleMember,
  getMemberBySelectedDate,
  //   getDebit,
  updateMember,
  addMember,
  deleteMember,
  getPerMember,
  addPayment,
  getMemberListByFilter,
  getPerMemberByRollNo
};

