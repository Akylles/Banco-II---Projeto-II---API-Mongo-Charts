import serviceOcorrencia from "../services/ocorrencia.service.js";

const mostrarOcorrencias = async (req, res) => {
    let colecaoOcorrencias = await serviceOcorrencia.buscarTodos()
    
    colecaoOcorrencias = colecaoOcorrencias.map(
        ocorrencia => {
            return {
                id: ocorrencia._id,
                titulo: ocorrencia.titulo,
                tipo: ocorrencia.tipo,
                data: ocorrencia.data.toLocaleString('pt-BR', { timezone: 'UTC' }),
                localizacao: ocorrencia.localizacao
            }
        }
    )

    res.render('ocorrencias/ocorrencias', {ocorrencias: colecaoOcorrencias})
}

const registrarOcorrencia = async (req, res) => {
    const novaOcorrencia = req.ocorrencia

    await serviceOcorrencia.salvar(novaOcorrencia)
    req.flash('sucesso_mensagem','Ocorrência salva com sucesso no banco de dados')
    res.redirect('/ocorrencias/')
}

const exibirMapa = (req, res) => {
    res.render('mapa/mapa')
}

const renderizarFormulario = (req, res) => {

    res.render('ocorrencias/formulario', {
        lat: req.params.lat,
        lng: req.params.lng
    })
}

const visualizarLocalizacao = async (req, res) => {    
    const buscarOcorrencia = await serviceOcorrencia.buscarPorId(req.params.id)
    
    const ocorrencia = {
        id: buscarOcorrencia._id,
        titulo: buscarOcorrencia.titulo,
        tipo: buscarOcorrencia.tipo,
        data: buscarOcorrencia.data.toLocaleString('pt-BR', { timezone: 'UTC' }),
        lat: buscarOcorrencia.localizacao.coordinates[1],
        lng: buscarOcorrencia.localizacao.coordinates[0]
    }

    res.render('mapa/local', ocorrencia)
}

const deletar = async (req, res) => {
    const ocorrencia = req.ocorrencia

    await serviceOcorrencia.deletar(ocorrencia)
    
    res.redirect('/ocorrencias/')
}

const formEdicao = async (req, res) => {
    const id = req.params.id

    res.render('ocorrencias/editForm', {id: id})
}

const atualizar = async (req, res) => {
    const id = req.params.id

    const atributos = {
        titulo: req.body.titulo,
        tipo: req.body.tipo,
        data: req.body.data
    }

    await serviceOcorrencia.atualizar(id, atributos)
    
    req.flash('sucesso_mensagem','Atualização feita com sucesso no banco de dados')
    res.redirect('/ocorrencias/')
}

const mostrarCharts = (req, res) => res.render('ocorrencias/charts')

const controllerOcorrencia = {
    visualizarLocalizacao,
    registrarOcorrencia,
    mostrarOcorrencias,
    exibirMapa,
    renderizarFormulario,
    deletar,
    formEdicao,
    atualizar,
    mostrarCharts
}

export default controllerOcorrencia