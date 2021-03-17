const bcrypt = require('bcrypt')
const fs = require('fs')
const path = require('path')

// const dbjson = path.join('../static-database/db.json')


const index = (req, res) => {
    res.render('login/index');
}

const submit = (req, res) => {
    const dadosEnviado = req.body
    let { email, password } = req.body

    let base = fs.readFileSync('./static-database/db.json', { encoding: 'utf-8' })
    base = JSON.parse(base)

    let validaUsu = base.find((atual) => {
        if (email == atual.email) { return true }
    })

    let validaSenha = bcrypt.compareSync(password, validaUsu.password)


    if (validaSenha == true) {

        res.redirect('inicio')
    } else {
        res.send('login invalido')

    }
}


const cadastro = (req, res) => {
    res.render('login/cadastro');
}

const novoCadastro = (req, res) => {
    const dadosEnviado = req.body
    let { email, password, confirmpassword } = req.body
    let base = fs.readFileSync('./static-database/db.json', { encoding: 'utf-8' })
    base = JSON.parse(base)

    //validar senha
    let senhaC = bcrypt.hashSync(password, 10)
    let confSenhaC = bcrypt.compareSync(confirmpassword, senhaC)

    //validar emmail no cadastro
    let validaEmail = base.find((atual) => {
        if (email == atual.email) {
            return true
        }
    })



    let enviar = { email: dadosEnviado.email, password: senhaC }

    if (confSenhaC == true & validaEmail == undefined) {

        base.push(enviar)
        base = JSON.stringify(base);
        fs.writeFileSync('./static-database/db.json', base)

    } else { res.send('senhas invalidas / email ja cadastrado') }



    res.redirect('/login');
}



const inicio = (req, res) => {
    let base = fs.readFileSync('./static-database/db.json', { encoding: 'utf-8' })
    base = JSON.parse(base)

    res.render('login/inicio', { base: base })
}


module.exports = {
    index,
    submit,
    cadastro,
    novoCadastro,
    inicio
}