const express = require('express')
const router = express.Router();

const { 
    registrar, 
    confirmar, 
    autenticar, 
    perfil, 
    olvidePassword, 
    comprobarToken, 
    nuevoPassword 
} = require('../controllers/usuarioController.js');
const checkAuth = require('../middleware/authMiddleware.js');

router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);
// area prvado
router.get("/perfil", checkAuth, perfil)
router.post("/olvide-password", olvidePassword)
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

module.exports = router;