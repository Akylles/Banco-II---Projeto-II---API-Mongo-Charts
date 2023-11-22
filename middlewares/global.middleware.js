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

const temOcorrenciaCadastrada = async (req, res, next) => {
    const listaOcorrencias = await serviceOcorrencia.buscarTodos()

    if (listaOcorrencias.length == 0){
        res.render('ocorrencias/ocorrencias', {ocorrencias: {}})
    }else{
        next()
    }
}

const middlewareGlobal = {validaForm, temOcorrenciaCadastrada}

export default middlewareGlobal