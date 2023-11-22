import mongoose from "../database/conexao.js"

const ocorrenciaSchema = mongoose.Schema({
    titulo:{
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    localizacao: {
        type: {
          type: String, 
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    }
})

const Ocorrencia = mongoose.model('ocorrencia', ocorrenciaSchema)


export default Ocorrencia
