const app = require("./app");
const port = 3800;

//conexion db
const db = require("./db");

app.listen(port, () => {
  console.log("Servidor corriendo en http://localhost:" + port);
});