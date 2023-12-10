import UserController from "../controllers/user.controller.js";
import express from "express";


const router = express.Router();
const controller = new UserController; 

router.get('/', (req,res) => {
    res.send('Velkommen')
});

router.get('/users', (req, res) => {
    controller.list(req, res)
});

router.get('/user/:id([0-9]*)', (req, res) => {
    controller.details(req, res)
});

router.post('/user/create', (req, res) => {
    controller.create(req, res)
});

router.put('/user/update', (req, res) => {
    controller.update(req, res)
});

router.delete('/user/delete/:id([0-9]*)', (req, res) => {
    controller.remove(req, res)
})

export { router as UserRouter}