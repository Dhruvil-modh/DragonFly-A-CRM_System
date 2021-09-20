const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    firm_type : {
        type : String
    },
    Client_type : {
        type : String
    },
    firm_Name : {
        type : String
    },
    UA_Number : {
        type : String
    },
    PAN : {
        type : String
    },
    GST : {
        type : String
    },
    Con_person : {
        type : String
    },
    Con_PhNo : {
        type : String
    },
    Scheme : {
        type : String
    },
    Catogary : {
        type : String
    },
    Address : {
        type : String
    },
    City : {
        type : String
    },
    Pin : {
        type : String
    },
    State : {
        type : String
    },
    Country : {
        type : String
    },
    email : {
        type : String
    },
    firm_PhNo : {
        type : String
    },
    Fees_in_per : {
        type : String
    },
    Fees : {
        type : String
    },
    IFP_email : {
        type : String
    },
    IFP_pw : {
        type : String
    },

    job : [{Firm_name : String,
         job_type : String , 
         end_date : String , 
         Scheme : String , 
         Status : String , 
         Priority : String , 
         Catagory : String ,
         App_recive : String , 
         Fee_Aggreed : String , 
         Responsible : String ,
         //mandatory fields
         Clm_Amt_Rec : String,
         Apro_Clm_Date : String,
         Production_Date : String,
         App_Date : String,
         Bank : String,
         Bank_Branch : String,
         District : String,
         Loan_San_Amt : String,
         Loan_San_Date : String,
         First_Disb_Date : String,
         //Subsidy Claim Dynamic
         Sub_Cla_Start_Date : String,
         Sub_Cla_End_Date : String,
         Self_Email : String,
         Claim_Status : String,
         Interest_Subsidy_Amount : String,
         Capital_Subsidy_Amount : String,
         Approved_Claim_No : String,
         Approved_Claim_Period : String,
         Claim_Submission_Date : String,
         Contact_person : String,
         Contact_Number : String,
         Remarks : String,
         //State Govt Dynamic
         Issue_Date : String,
         Subsidy_sanction_Date : String,
         Tax1_Application_Date : String,
         Tex2_Date : String,
         term_loan_Amount : String,
         Subsidy_period_start_date : String,
         Subsidy_Period_End_Date : String }]

});

const Register = mongoose.model('Register', schema);

module.exports = Register;


