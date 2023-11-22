import Ocorrencia from "../models/Ocorrencia.js";

const salvar = async atributos => await new Ocorrencia(atributos).save()

const buscarTodos = async () => await Ocorrencia.find()

const buscarPorId = async id => await Ocorrencia.findById(id)

const serviceOcorrencia = {salvar, buscarTodos, buscarPorId}

export default serviceOcorrencia