import mongoose from "mongoose"
import serviceOcorrencia from "../services/ocorrencia.service.js"

const validaForm = (req, res, next) => {
    const titulo = req.body.titulo
    const tipo = req.body.tipo
    const data = req.body.data

    const erros = []

    if (!titulo || titulo == ''){
        erros.push({texto: 'ERRO: Título inválido'})
    }
    if (!tipo || tipo == ''){
        erros.push({texto: 'ERRO: Tipo de ocorrência inválido.'})
    }
    if (!data){
        erros.push({texto: 'ERRO: Data inválida'})
    }

    if (erros.length > 0){
        res.render('ocorrencias/formulario', {
            lat: req.params.lat,
            lng: req.params.lng,
            erros: erros
        }) 
    }else{
        const latitude = req.body.lat
        const longitude = req.body.lng
    
        const ponto = { type: 'Point', coordinates: [longitude, latitude]};
        
        const novaOcorrencia = {
            titulo: titulo,
            tipo: tipo,
            data: data,
            localizacao: ponto
        }
        req.ocorrencia = novaOcorrencia
        next()
    }
}

const validaID = (req, res, next) => {
    const id = req.params.id

    if (mongoose.Types.ObjectId.isValid(id)) {
        req.id = id
        next()
    } else {
        res.status(400).send({ error: "ERRO: Id inválido" })
    }
}

const validaOcorrencia = async (req, res, next) => {
    const id = req.params.id

    const ocorrencia = await serviceOcorrencia.buscarPorId(id)
    
    if (ocorrencia) {
        req.ocorrencia = ocorrencia
        next()
    } else {
        res.status(400).send({ error: "ERRO: Ocorrência não encontrada" })
    }
}

const temOcorrenciaCadastrada = async (req, res, next) => {
    const listaOcorrencias = await serviceOcorrencia.buscarTodos()

    if (listaOcorrencias.length == 0){
        res.render('ocorrencias/ocorrencias', {ocorrencias: {}})
    }else{
        next()
    }
}

const middlewareGlobal = {validaForm, temOcorrenciaCadastrada, validaID, validaOcorrencia}

export default middlewareGlobal