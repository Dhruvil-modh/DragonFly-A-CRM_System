const axios = require('axios');
const dotenv = require('dotenv');


const PORT = process.env.PORT || 8080;

exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get(`http://localhost:${PORT}/api/users`)
        .then(function(response){
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

exports.homeRoutes_firmdd = (req, res) => {
    // Make a get request to /api/users
    axios.get(`http://localhost:${PORT}/api/users`)
        .then(function(response){
            res.render('addjob', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}


exports.homeRoutes_tasks = (req, res) => {
    // Make a get request to /api/users
    axios.get(`http://localhost:${PORT}/api/users`)
        .then(function(response){
            res.render('tasks', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}



exports.register = (req, res) =>{
    res.render('register');
}



exports.login = (req, res) =>{
    res.render('login');
}


exports.logout = (req, res) =>{
    req.logout();
    res.redirect('login');
}

exports.firm_profile = (req, res) => {
    // Make a get request to /api/users
    axios.get(`http://localhost:${PORT}/api/users`)
        .then(function(response){
            const id = req.params.id;
            console.log(`id is : ${id}`);
            res.render('firm_profile', { users : response.data , id});
        })
        .catch(err =>{
            res.send(err);
        })

    
}












exports.addjob = (req, res) =>{
    axios.get(`http://localhost:${PORT}/api/users`, { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("addjob", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}


exports.update_firm = (req, res) =>{
    axios.get(`http://localhost:${PORT}/api/users`, { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_firm", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}



exports.update_task = (req, res) =>{
    axios.get(`http://localhost:${PORT}/api/users`, { params : { id : req.query.id }})
        .then(function(userdata){

            for(var i = 0; i<=5 ;i++)
            {
                var x = userdata.data.job[i]._id;
                
                if(x === req.query.job_id)
                { res.render("update_task", { task : userdata.data.job[i] , user : userdata.data})
                    console.log(i);
                    console.log(userdata.data.job[i])
                    break;
                }
            }
        })
        .catch(err =>{
            res.send(err);
        })
}




exports.user_register = (req, res) =>{
    res.render('user_register');
}
