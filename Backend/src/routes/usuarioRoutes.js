const express = require("express");

const router = express.Router();

const {

    cadastrarUsuario,

    listarUsuarios,

    buscarUsuarioPorId,

    atualizarUsuario,

    excluirUsuario,

    loginUsuario

} = require("../controllers/usuarioController.js");


// POST - login
router.post("/login", loginUsuario);


// POST - cadastrar usuário
router.post("/", cadastrarUsuario);


// GET - listar usuários
router.get("/", listarUsuarios);


// GET - buscar usuário por ID
router.get("/:id", buscarUsuarioPorId);


// PUT - atualizar usuário
router.put("/:id", atualizarUsuario);


// DELETE - excluir usuário
router.delete("/:id", excluirUsuario);


module.exports = router;