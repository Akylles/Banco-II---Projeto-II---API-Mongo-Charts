import express from 'express'
import controllerOcorrencia from '../controllers/ocorrencia.controller.js'
import middlewareGlobal from '../middlewares/global.middleware.js'

const router = express.Router()

router.get('/', middlewareGlobal.temOcorrenciaCadastrada, controllerOcorrencia.mostrarOcorrencias)

router.get('/mapa', controllerOcorrencia.exibirMapa)

router.get('/form/:lat/:lng', controllerOcorrencia.renderizarFormulario)

router.post('/salvar', middlewareGlobal.validaForm, controllerOcorrencia.registrarOcorrencia)

router.get('/local/:id', controllerOcorrencia.visualizarLocalizacao)

export default router