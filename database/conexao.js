import mongoose from 'mongoose'
import 'dotenv/config'

// Cria conexão com o Banco

await mongoose.connect(process.env.MONGODB_URL)
.then(()=> console.log('Conexao criada com sucesso'))
.catch(()=>console.log('ERRO, não funcionou a conexao'))        

export default mongoose
