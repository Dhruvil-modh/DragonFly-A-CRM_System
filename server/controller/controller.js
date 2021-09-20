var Register = require("../model/model");
var users_crediantial = require("../model/login-module");
var passport = require('passport')
const bcrypt = require("bcrypt");

const session = require('express-session');
const cookieParser = require('cookie-parser');






// create and save new user
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }

  // new user

  const registeremp = new Register({
    firm_type: req.body.Firm_type,
    Client_type: req.body.client_type,
    firm_Name: req.body.Firm_name,
    UA_Number: req.body.UA_Number,
    PAN: req.body.PAN,
    GST: req.body.GST,
    Con_person: req.body.Con_person,
    Con_PhNo: req.body.Con_PhNo,
    Scheme: req.body.Scheme,
    Catogary: req.body.Catogary,
    Address: req.body.Address,
    City: req.body.City,
    Pin: req.body.Pin,
    State: req.body.State,
    Country: req.body.Country,
    email: req.body.email,
    firm_PhNo: req.body.firm_PhNo,
    Fees_in_per: req.body.Fees_in_per,
    Fees: req.body.Fees,
    IFP_email : req.body.IFP_email,
    IFP_pw : req.body.IFP_pw,
    job: undefined,
  });

  // save user in the database
  registeremp
    .save(registeremp)
    .then((data) => {
      //res.send(data)
      res.render("register");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
};

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Register.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Erro retrieving user with id " + id });
      });
  } else {
    Register.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send({
            message:
              err.message || "Error Occurred while retriving user information",
          });
      });
  }
};

// Update a new idetified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.body.Firm_name;
  console.log(id);
  Register.findOneAndUpdate(
    { firm_Name: id },
    {
      $push: {
        job: {
          Firm_name: req.body.Firm_name,
          job_type: req.body.job_type,
          end_date: req.body.edate,
          Scheme: req.body.Scheme,
          Status: req.body.Status,
          Priority: req.body.Priority,
          Catagory: req.body.Catogary,
          App_recive: req.body.App_recive,
          Fee_Aggreed: req.body.T_Fees,
          Responsible: req.body.Responsible,
          //mandatory fields
          Clm_Amt_Rec: req.body.Clm_Amt_Rec,
          Apro_Clm_Date: req.body.Apro_Clm_Date,
          Production_Date: req.body.Production_Date,
          App_Date: req.body.App_Date,
          Bank: req.body.Bank,
          Bank_Branch: req.body.Bank_Branch,
          District: req.body.District,
          Loan_San_Amt: req.body.Loan_San_Amt,
          Loan_San_Date: req.body.Loan_San_Date,
          First_Disb_Date: req.body.First_Disb_Date,
          //Subsidy Claim Dynamic
          Sub_Cla_Start_Date: req.body.Sub_Cla_Start_Date,
          Sub_Cla_End_Date: req.body.Sub_Cla_End_Date,
          Self_Email: req.body.Self_Email,
          Claim_Status: req.body.Claim_Status,
          Interest_Subsidy_Amount: req.body.Interest_Subsidy_Amount,
          Capital_Subsidy_Amount: req.body.Capital_Subsidy_Amount,
          Approved_Claim_No: req.body.Approved_Claim_No,
          Approved_Claim_Period: req.body.Approved_Claim_Period,
          Claim_Submission_Date: req.body.Claim_Submission_Date,
          Contact_person: req.body.Contact_person,
          Contact_Number: req.body.Contact_Number,
          Remarks: req.body.Remarks,
          //State Govt Dynamic
          Issue_Date: req.body.Issue_Date,
          Subsidy_sanction_Date: req.body.Subsidy_sanction_Date,
          Tax1_Application_Date: req.body.Tax1_Application_Date,
          Tex2_Date: req.body.Tex2_Date,
          term_loan_Amount: req.body.term_loan_Amount,
          Subsidy_period_start_date: req.body.Subsidy_period_start_date,
          Subsidy_Period_End_Date: req.body.Subsidy_Period_End_Date,
        },
      },
    }
  )
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot Update user with ${id}. Maybe user not found!`,
          });
      } else {
       // res.send(data);
        res.redirect("addjob");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user information" });
    });
};

exports.update_status = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }
  const name = req.body.Firm_name;

  console.log(name);
  const n = req.body.Job_type;

  console.log("n is : " + n);

  Register.updateOne(
    { firm_Name: name, "job.job_type": n },
    { $set: { "job.$.Status": req.body.Status } }
  )
    //  Register.findOneAndUpdate({firm_Name : id }, {$update : {job[n] :{Firm_name : req.body.Firm_name}}})
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot Update user with ${id}. Maybe user not found!`,
          });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user information" });
    });
};

exports.update_firm = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }
  const id = req.body.id;

  console.log(id);
  const n = req.body.Job_type;

  console.log("n is : " + n);

  Register.updateOne(
    { _id: id },
    {
      $set: {
        firm_type: req.body.Firm_type,
        Client_type: req.body.client_type,
        firm_Name: req.body.Firm_name,
        UA_Number: req.body.UA_Number,
        PAN: req.body.PAN,
        GST: req.body.GST,
        Con_person: req.body.Con_person,
        Con_PhNo: req.body.Con_PhNo,
        Scheme: req.body.Scheme,
        Catogary: req.body.Catogary,
        Address: req.body.Address,
        City: req.body.City,
        Pin: req.body.Pin,
        State: req.body.State,
        Country: req.body.Country,
        email: req.body.email,
        firm_PhNo: req.body.firm_PhNo,
        Fees_in_per: req.body.Fees_in_per,
        Fees: req.body.Fees,
        IFP_email : req.body.IFP_email,
        IFP_pw : req.body.IFP_pw
      },
    }
  )
    //  Register.findOneAndUpdate({firm_Name : id }, {$update : {job[n] :{Firm_name : req.body.Firm_name}}})
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot Update user with ${id}. Maybe user not found!`,
          });
      } else {
        //res.send(data);
        res.redirect("firm_profile"+id);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user information" });
    });
};

exports.update_task = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }
  const id = req.body.id;
  const job_id = req.body.job_id;
  console.log(id);
  console.log("job :" + job_id);
  const n = req.body.Job_type;

  console.log("n is : " + n);

  Register.updateOne(
    { _id: id, "job._id": job_id },
    {
      $set: {
        "job.$.Firm_name": req.body.Firm_name,
        "job.$.job_type": req.body.job_type,
        "job.$.end_date": req.body.edate,
        "job.$.Scheme": req.body.Scheme,
        "job.$.Status": req.body.Status,
        "job.$.Priority": req.body.Priority,
        "job.$.Catogary": req.body.Catogary,
        "job.$.App_recive": req.body.App_recive,
        "job.$.Fee_Aggreed": req.body.T_Fees,
        "job.$.Responsible": req.body.Responsible,
        "job.$.Firm_name": req.body.Firm_name,
      },
    }
  )
    //  Register.findOneAndUpdate({firm_Name : id }, {$update : {job[n] :{Firm_name : req.body.Firm_name}}})
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot Update user with ${id}. Maybe user not found!`,
          });
      } else {
       // res.send(data);
        res.redirect("firm_profile"+id+"#"+job_id);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user information" });
    });
};

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};







exports.login = (req, res) => {
  
    const password = req.body.password;
    const email = req.body.email;
    console.log(`PW entered:${password}`);
     users_crediantial.find({email: email})
    .then((data) => {

          console.log("hello :"+data[0].password)
          const userpassword = data[0].password;


          if (userpassword === password) {
            res.redirect("/");
            console.log("hello2222")
          } else {
            console.log(
              `email is in database :  .................password = ${userpassword}`
            );
            res.send(`email is in database : ${useremail}`);
          }
        
    }) .catch((err) => {
      });

/*

          if (userpassword === password) {
            res.render("index");
          } else {
            console.log(
              `email is in database : ${useremail} .................password = ${userpassword}`
            );
            res.send(`email is in database : ${useremail}`);
          }
        }
      
  //   userpassword = useremail.password;
   // console.log(`PW :${userpassword}`);
  //  console.log(`email from :${useremail}`);
    //const passwordcmp = bcrypt.compare(password, userpassword);

   // if (passwordcmp)
  /*    if (userpassword === password) {
        res.render("index");
      } else {
        console.log(
          `email is in database : ${useremail} .................password = ${userpassword}`
        );
        res.send(`email is in database : ${useremail}`);
      }*/
};

exports.insertuser = (req, res) => {
  // validate request
  var password = req.body.password;

bcrypt.genSalt(10, (err,salt) =>{
  if(err) throw err;
  bcrypt.hash(password, salt, (err, hash) => {
    if(err) throw err;
    password = hash;
    console.log("hello"+password)
    const insertu = new users_crediantial({
      firstname : req.body.name,
      email : req.body.email,
      password : password
    });
  
    // save user in the database
    insertu.save(insertu)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||"Some error occurred while creating a create operation",
        });
      });
    
  })
 
} )

 


};

