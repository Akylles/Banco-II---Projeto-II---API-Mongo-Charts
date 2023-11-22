import mongoose from "mongoose";
import Ocorrencia from "../models/Ocorrencia.js";

const salvar = async atributos => await new Ocorrencia(atributos).save()

const buscarTodos = async () => await Ocorrencia.find()

const buscarPorId = async id => await Ocorrencia.findById(id)

const deletar = async id => await Ocorrencia.deleteOne({_id: new mongoose.Types.ObjectId(id)})

const atualizar = async (id, atributos) => await Ocorrencia.findByIdAndUpdate(id, atributos)

const serviceOcorrencia = {salvar, buscarTodos, buscarPorId, deletar, atualizar}

export default serviceOcorrencia