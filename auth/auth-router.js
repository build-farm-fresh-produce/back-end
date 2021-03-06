const router = require('express').Router();

const Auth = require('./auth-model.js');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets.js');


router.post('/register', async (req, res) => {
  
  const data = await Auth.addUser(req.body)

  try {
      
        res.status(201).json(data)

  } catch (error) {
      
        console.log(error)

        next(error);
  }

});

router.post('/login', async (req, res, next) => {
  
  try {
      
    const { username, password } = req.body

    const user = await Auth.findBy({ username }).first()

    //However, if you are using bcrypt on a server, 
    //the async mode is recommended. This is because the hashing done 
    //by bcrypt is CPU intensive, so the sync version will block the event 
    //loop and prevent your application from servicing any other inbound 
    //requests or events. The async version uses a thread pool which does 
    //not block the main event loop.
    const passwordValid = await bcrypt.compareSync(password, user.password)

    // const passwordValid = await bcrypt.compare(password, user.password)

    if (user && passwordValid){

        //sign/generate token
        const token = generateToken(user);

        req.headers.authorization = token;

        // const pr_token = req.headers.authorization;

        //send token back
        res.status(200).json({
            message: `Welcome ${user.username}, have a token...!`,
            userName: user.username,
            userId: user.id,
            is_farmer: user.is_farmer,
            token, //attache token as part of response,
            

        })
    }else{
        res.status(401).json({
            message: `Invalid Credentials!`, 
        })
    }

  } catch (error) {
      
        next(error)


  
  }


});


//JWT helper function
function generateToken(user) {
  const payload = {
    subject: user.id, // sub in payload is what the token is about
    username: user.username,
    // ...otherData
  };

  const options = {
    expiresIn: '1h', // show other available options in the library's documentation
  };

  // extract the secret away so it can be required and used where needed
  return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
}


module.exports = router;
