const express = require('express');
const router = express.Router();
// const [ DESC } = require('sequelize');
const { User } = require('./database');

router.get('/', (req, res, next) => {
    User.findAll({
        paranoid: false,
        attributes: ['id', ['firstName', 'nombre'], 'email', 'role'],
        // order: ['role', 'DESC'],
    })
        .then((allUsers) => {
        return res.status(200).json ({
            data: allUsers
        })
    })
    .catch((err) => next(err))
})

router.get('/:userId', () => {
    const { userId } = req.params;

    User.findOne({
        where: {
            id: userId
        }
    })
        .then((user) => {
            if(user) {
                return res.status(200).json({
                    data: user
                })
            } else {
            return res.status(404).json({
                name: "Not found",
                message: "Sorry, el usuario que buscas no existe"
            })
        }
        })
        .catch((err) => next(err))
})

// Para crear un usuario
router.post('/', (req, res, next) => {
    User.create(req.body)
        .then((user) => {return res.status(201).json(user);})
        .catch((err) => next(err))
})

router.patch('/:userId', async (req, res, next) => {
    const { userId } = req.params;
    const { body } = req;

    try {
        let user = await User.findByPk(userId) 
    
    if(user){
        await user.update(
            body,
        )
        return res.status(200).json({
            data: user
        })
    } else {
        return res.status(404).json({
            name: "Not Found",
            message: "Sorry, el usuario que buscas no existe"
        })
    }

    } catch(err) {
        next(err);
    }
})

router.delete('/:userId', async (req, res, next) => {
    const { userId } = req.params;
   
    try {
        let user = await User.findByPk(userId) 
    
    if(user){
        await user.destroy()
        return res.status(204).send()
        } else {
            return res.status(404).json({
                name: "Not Found",
                message: "Sorry, el usuario que buscas no existe"
            })
        }
    } catch(err) {
        next(err);
    }
})

module.exports = router
