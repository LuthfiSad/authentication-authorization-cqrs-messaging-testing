import express from "express";
import jwt from "jsonwebtoken";

const authService = express();
authService.use(express.json());
const SECRET_KEY = "supersecretkey"; // Ganti dengan kunci yang aman

// Endpoint login untuk menghasilkan token
authService.post("/login", (req, res) => {
    const { username, password } = req.body;
    // Validasi user (mock)
    if (username === "user" && password === "password") {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
        return res.json({ token });
    }
    return res.status(401).json({ message: "Invalid credentials" });
});

// Endpoint untuk validasi token
authService.post("/validate-token", (req, res) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });   

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid token" });
        res.json({ valid: true, data: decoded });
    });
});

authService.listen(3001, () => console.log("Auth Service running on port 3001"));
