

import express from 'express'
import sequelize from "../config/db.sequelize.js";


const router = express.Router();

router.get('/', (req,res) => {
    (async () => {
        try {
        await sequelize.authenticate();
        console.log('Der er forbindelse til databasen');
        } catch (error) {
        console.error('Fejl! Kunne ikke forbinde til databasen: ', error);
        }
    })()
    res.send('Velkommen')
});




export { router as MainRouter }

