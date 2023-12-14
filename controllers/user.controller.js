import User from "../models/user.model.js";

//create array for use in CREATE and UPDATE functions.
const userParams = [ 
  "first_name",
  "last_name",
  "email",
  "password",
  "gender"
];

export default class UserController {
  //GET ALL USERS
  list = async (req, res) => {
    try {
      const result = await User.findAll({
        attributes: ['id', 'first_name', 'last_name', 'email']
      });
      res.json(result);
    } catch (error) {
      res.send(error);
    }
  };

  //GET USER DETAILS
  details = async (req, res) => {
    const { id } = req.params;

    try {
      const result = await User.findByPk(id);
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  };

  //CREATE USER
  create = async (req, res) => {
    const {
      first_name,
      last_name,
      email,
      password,
      gender
    } = req.body;

    // Create an object with only the provided parameters
    const userObject = {};
    for (const param of userParams) {
        //IF/Else statement that checks if data is provided in the form and returns it to the userObject. If data is missing, function stops and user is not created 
      if (req.body[param]) {
        userObject[param] = req.body[param];
      } else { 
        console.error(`Missing required parameter: ${param}`);
        //return to abort function if else statement is run, thereby not creating a user with missing data
        return res.status(400).json({
          message: `Missing required parameter: ${param}`,
        });
      }
    }

    try {
      // Create the user with the dynamically built object
      const result = await User.create(userObject);

      res.json({
        message: "User Successfully Created",
        userObject
      });
    } catch (error) { 
      //If Statement to check if Email is already in use
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'User Already Exists' }); 
    }
      console.error("Error creating user:", error);
      //runs if wrong DATATYPE is entered in the form body. i.e invalid date of birth or text entered in interger field, etc.
      res.status(500).json({
        message: "Internal Server Error", 
      });
    }
  }; //create function end

  update = async (req, res) => {
    const {
      id,  
      first_name,
      last_name,
      email,
      password,
      gender
      
    } = req.body;

    const userObject = await User.findOne({
      where: { id: id }
    });


    const updatedUserObject = {};
    for (const param of userParams) { // loops through each array item
      if (  req.body[param] !== undefined &&
            req.body[param] !== null &&
            req.body[param] !== "") { // Only updates entered values. If values are as stated, they're send to the userObject, which is then called in the User.update in the try/catch statement
        updatedUserObject[param] = req.body[param]; // sets the param of given iteration as userObject param
      };
    };

    // checks if any parameters are entered. return statement terminates function and thereby not updating, if no parameters are entered
    if (Object.keys(userObject).length === 0) {
        return res.status(400).json({
          message: 'No valid parameters provided for update',
        });
      };
      
    try { 
      const result = await User.update(updatedUserObject, {
        where: { id: id }
      });
      res.json({
        message: "User Updated",
        oldValues: userObject,
        updatedValues: updatedUserObject,
      });
    } catch (error) { //runs if wrong DATATYPE is entered in the form body. i.e invalid date of birth or text entered in interger field, etc.
      console.error("Error creating user:", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    };
  }; //Update function end




  remove = async (req, res) => {
    const {id} = req.params;

    try{
        await User.destroy({
            where: {id: id},
        });
        res.status(200).send({
          message: "User Deleted",
        });
    } catch (error) {
        res.send(error)
    };
  };





}; // Controller end

