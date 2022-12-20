const mongoose = require('mongoose');


mongoose.connect(
    process.env.DATABASE_URL,
    {useNewUrlParser: true , useUnifiedTopology: true},
    (e) => {
        if(!e) console.log("Base de donnée connecté !")
        else console.log("Erreur de connexion: " + e)
    }
)