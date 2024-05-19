const express = require('express');
const router = express.Router();
const User = require('../models/user');
const sendMail = require('../config/mailer');

// Obtener usuarios
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}, 'name email role');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Eliminar usuarios inactivos
router.delete('/', async (req, res) => {
    const thresholdDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 días
    try {
        const usersToDelete = await User.find({ lastConnection: { $lt: thresholdDate } });

        for (const user of usersToDelete) {
            sendMail(user.email, 'Cuenta eliminada por inactividad', 'Tu cuenta ha sido eliminada por inactividad.');
            await user.remove();
        }

        res.json({ message: 'Usuarios inactivos eliminados' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Actualizar un usuario
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { name, email, role }, { new: true });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (user) {
            res.json({ message: 'Usuario eliminado' });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
