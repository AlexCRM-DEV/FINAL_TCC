const Usuario = require("../models/Usuario");


// ==========================================
// CADASTRAR USUÁRIO
// ==========================================
const cadastrarUsuario = async (req, res) => {

    try {

        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {

            return res.status(400).json({
                mensagem: "Nome, e-mail e senha são obrigatórios."
            });

        }

        const usuarioExistente = await Usuario.findOne({
            email
        });

        if (usuarioExistente) {

            return res.status(400).json({
                mensagem: "Este e-mail já está cadastrado."
            });

        }

        const usuario = new Usuario({
            nome,
            email,
            senha
        });

        await usuario.save();

        res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso!",
            usuario
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensagem: error.message
        });

    }

};


// ==========================================
// LISTAR USUÁRIOS
// ==========================================
const listarUsuarios = async (req, res) => {

    try {

        const usuarios = await Usuario.find();

        res.status(200).json(usuarios);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao buscar usuários.",
            erro: error.message
        });

    }

};


// ==========================================
// BUSCAR USUÁRIO POR ID
// ==========================================
const buscarUsuarioPorId = async (req, res) => {

    try {

        const { id } = req.params;

        const usuario = await Usuario.findById(id);

        if (!usuario) {

            return res.status(404).json({
                mensagem: "Usuário não encontrado."
            });

        }

        res.status(200).json(usuario);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao buscar usuário.",
            erro: error.message
        });

    }

};


// ==========================================
// ALTERAR USUÁRIO
// ==========================================
const atualizarUsuario = async (req, res) => {

    try {

        const { id } = req.params;

        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {

            return res.status(400).json({
                mensagem: "Nome, e-mail e senha são obrigatórios."
            });

        }

        // Verifica se outro usuário já usa esse e-mail
        const usuarioExistente = await Usuario.findOne({
            email,
            _id: { $ne: id }
        });

        if (usuarioExistente) {

            return res.status(400).json({
                mensagem: "Este e-mail já está cadastrado para outro usuário."
            });

        }

        const usuario = await Usuario.findByIdAndUpdate(
            id,
            {
                nome,
                email,
                senha
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!usuario) {

            return res.status(404).json({
                mensagem: "Usuário não encontrado."
            });

        }

        res.status(200).json({
            mensagem: "Usuário atualizado com sucesso!",
            usuario
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao atualizar usuário.",
            erro: error.message
        });

    }

};


// ==========================================
// EXCLUIR USUÁRIO
// ==========================================
const excluirUsuario = async (req, res) => {

    try {

        const { id } = req.params;

        const usuario = await Usuario.findByIdAndDelete(id);

        if (!usuario) {

            return res.status(404).json({
                mensagem: "Usuário não encontrado."
            });

        }

        res.status(200).json({
            mensagem: "Usuário excluído com sucesso!"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao excluir usuário.",
            erro: error.message
        });

    }

};


// ==========================================
// LOGIN
// ==========================================
const loginUsuario = async (req, res) => {

    try {

        const { email, senha } = req.body;

        if (!email || !senha) {

            return res.status(400).json({
                mensagem: "E-mail e senha são obrigatórios."
            });

        }

        const usuario = await Usuario.findOne({
            email
        });

        if (!usuario) {

            return res.status(401).json({
                mensagem: "E-mail ou senha incorretos."
            });

        }

        if (usuario.senha !== senha) {

            return res.status(401).json({
                mensagem: "E-mail ou senha incorretos."
            });

        }

        res.status(200).json({

            mensagem: "Login realizado com sucesso!",

            usuario: {

                id: usuario._id,

                nome: usuario.nome,

                email: usuario.email

            }

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensagem: error.message
        });

    }

};


module.exports = {

    cadastrarUsuario,

    listarUsuarios,

    buscarUsuarioPorId,

    atualizarUsuario,

    excluirUsuario,

    loginUsuario

};