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
    res.redirect('/assaltos/')
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

const controllerOcorrencia = {
    visualizarLocalizacao,
    registrarOcorrencia,
    mostrarOcorrencias,
    exibirMapa,
    renderizarFormulario
}

export default controllerOcorrencia