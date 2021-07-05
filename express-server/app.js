var express = require("express"), cors = require('cors');
var app = express();
app.use(express.json());
app.use(cors());
app.listen(3000, () => console.log("Server running on port 3000"));

var frutas = [ "Banana", "Manzana", "Durazno", "Pera", "Kiwi", "Melon", "Nueva York" ];
app.get("/frutas", (req, res, next) => res.json(frutas.filter((f)=> f.toLowerCase().indexOf(req.query.q.toString().toLowerCase()) > -1)));

var misFrutas = [];
app.get("/my", (req, res, next) => res.json(misFrutas));
app.post("/my", (req, res, next) => {
  console.log(req.body);
  misFrutas.push(req.body.nuevo);
  res.json(misFrutas);
});

app.get("/api/translation", (req, res, next) => res.json([
  {lang: req.query.lang, key: 'HOLA', value: 'HOLA ' + req.query.lang}
]));


