import express from 'express'
import handlebars from 'express-handlebars'
import router from './routes/rotasOcorrencia.js'
import session from 'express-session'
import flash from 'connect-flash'
import methodOverride from 'method-override'

const app = express()

// Handlebars

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Session

app.use(session({
    secret: 'exemploDeSession',
    resave: true,
    saveUninitialized: true
}))

app.use(flash())

app.use((req, res, next)=>{
    res.locals.sucesso_mensagem = req.flash('sucesso_mensagem')
    res.locals.erro_mensagem = req.flash('erro_mensagem')
    next()
})

const PORTA = 8080

app.use(express.urlencoded({extended: true}))

app.use(methodOverride('X­HTTP­Method'));
app.use(methodOverride('X­HTTP­Method­Override'));
app.use(methodOverride('X­Method­Override'));
app.use(methodOverride('_method', {methods: ['GET', 'POST']}))

app.use('/ocorrencias', router)

app.listen(PORTA, () => console.log(`APP ouvindo na porta ${PORTA}...`))