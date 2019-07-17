const express = require('express')
const app = express()
const Rol = require('../models/rol');

app.get('/rol', (req, res) => {
    Rol.find({
        state: true
    }).exec((err, roles) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            roles
        })
    });
});

app.post('/rol', (req, res) => {
    let body = req.body

    let rolParaGuardar = new Rol({
        name: body.name,
    });

    rolParaGuardar.save((err, roles) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!roles) {
            return res.status(400).json({
                ok: false,
                roles
            });
        }
        res.status(200).json({
            ok: true,
            roles
        });
    });
})


app.put('/rol/:id', (req, res) => {
    let id = req.params.id
    let body = req.body;

    let rolPorEditar = {
        name: body.name,
    }

    Rol.findByIdAndUpdate(id, rolPorEditar, {
        new: true,
        runValidators: true
    }, (err, roles) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!roles) {
            return res.status(400).json({
                ok: false,
                roles
            });
        }
        res.status(200).json({
            ok: true,
            roles
        })

    });
});

app.delete('/rol/:id', (req, res) => {
    let id = req.params.id
    let rolState = {
        state: false
    }

    Rol.findByIdAndUpdate(id, rolState, {
        new: true,
        runValidators: true
    }, (err, roles) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!roles) {
            ok: false,
            roles
        }

        res.status(200).json({
            ok: true,
            roles
        })
    })


});

module.exports = app