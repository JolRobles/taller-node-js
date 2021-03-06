const express = require("express");
const app = express();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const verificar_token = require('../middleware/auth');

app.get("/user", [verificar_token], (req, res) => {
    User.find({
            state: true
        },
        (err, usuarioDB) => {
            if (err) {
                return res.status.json({
                    ok: true,
                    err
                });
            }
            res.status(200).json({
                ok: true,
                usuarioDB
            });
        }
    ).populate("Rol");
});

app.post("/user", (req, res) => {
    let body = req.body;
    let userGuardar = new User({
        firstName: body.firstName,
        secondName: body.secondName,
        firstSurname: body.firstSurname,
        secondSurname: body.secondSurname,
        email: body.email,
        username: body.username,
        password: bcrypt.hashSync(body.password, 10),
        rol: body.rol
    });

    userGuardar.save((err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                error: err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            data: usuarioDB
        });
    });
});

app.put("/user/:id", verificar_token, (req, res) => {
    let id = req.params.id;

    let body = req.body;

    let usuarioPorEditar = {
        firstName: body.firstName,
        secondName: body.secondName,
        firstSurname: body.firstSurname,
        secondSurname: body.secondSurname,
        email: body.email,
        username: body.username,
        password: body.password,
        rol: body.rol
    };

    User.findByIdAndUpdate(
        id,
        usuarioPorEditar, {
            new: true,
            runValidators: true
        },
        (err, usuarioDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!usuarioDB) {
                return res.status(400).json({
                    ok: false,
                    usuarioDB
                });
            }
            res.status(200).json({
                ok: true,
                usuarioDB
            });
        }
    );
});

app.delete("/user/:id", verificar_token, (req, res) => {
    let id = req.params.id;
    let usarioState = {
        state: false
    };

    User.findByIdAndUpdate(
        id,
        usarioState, {
            new: true,
            runValidators: true
        },
        (err, usuarioDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!usuarioDB) {
                ok: false,
                usuarioDB;
            }

            res.status(200).json({
                ok: true,
                usuarioDB
            });
        }
    );
});
module.exports = app;