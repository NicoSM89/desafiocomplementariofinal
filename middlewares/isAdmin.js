const User = require('../models/user');

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (user && user.role === 'admin') {
            next(); 
        } else {
            res.status(403).json({ error: 'Acceso prohibido' }); 
        }
    } catch (error) {
        res.status(500).json({ error: 'Error en servidor' });
}};

module.exports = isAdmin;
