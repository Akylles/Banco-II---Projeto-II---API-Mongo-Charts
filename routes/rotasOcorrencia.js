import express from 'express'
import controllerOcorrencia from '../controllers/ocorrencia.controller.js'
import middlewareGlobal from '../middlewares/global.middleware.js'

const router = express.Router()

router.get('/', middlewareGlobal.temOcorrenciaCadastrada, controllerOcorrencia.mostrarOcorrencias)

router.get('/mapa', controllerOcorrencia.exibirMapa)

router.get('/form/:lat/:lng', controllerOcorrencia.renderizarFormulario)

router.post('/salvar', middlewareGlobal.validaForm, controllerOcorrencia.registrarOcorrencia)

router.get('/local/:id', middlewareGlobal.validaID, controllerOcorrencia.visualizarLocalizacao)

router.delete('/deletar/:id', middlewareGlobal.validaID, middlewareGlobal.validaOcorrencia, controllerOcorrencia.deletar)

router.get('/edicao/:id', middlewareGlobal.validaID, controllerOcorrencia.formEdicao)

router.patch('/atualizar/:id', controllerOcorrencia.atualizar)

router.get('/charts', controllerOcorrencia.mostrarCharts)

export default router