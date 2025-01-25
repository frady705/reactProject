import express from 'express';
import fs from 'fs';
import path from 'path';
import authMiddleware from '../middleware/authMiddleware.js';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../db/db.json');

// שליפת כל המתכונים
router.get('/', (req, res) => {
    const db = JSON.parse(fs.readFileSync(dbPath));
    res.json(db.recipes);
});

// הוספת מתכון עם אימות
router.post('/add', authMiddleware, (req, res) => {
    const { title, description,products } = req.body;

    // if (!title || !products || !description) {
    //     return res.status(400).json({ error: "All fields are required" });
    // }

    const db = JSON.parse(fs.readFileSync(dbPath));

    // יצירת המתכון החדש
    const newRecipe = {
        id: Date.now(),
        title,
        products,
        description,
        authorId: req.user.firstName||req.user.email,
    };

    db.recipes.push(newRecipe);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(201).json({ message: "Recipe added", recipe: newRecipe });
});

export default router;
