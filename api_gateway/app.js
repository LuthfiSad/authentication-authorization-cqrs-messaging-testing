import express from "express";
import axios from "axios";

const apiGateway = express();
apiGateway.use(express.json());

const INTERNAL_API_KEY = "gateway-secret-key"; // Kunci API antara Gateway dan Service

// Middleware untuk validasi JWT
apiGateway.use(async (req, res, next) => {  
  try {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ message: "Token missing" });
    const response = await axios.post("http://localhost:3001/validate-token", {}, {
      headers: { authorization: token },
    });
    if (response.data.valid) {
      req.user = response.data.data; // Data user dari token
      next();
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// Route ke Product Service dengan API Key
apiGateway.get("/videos", (req, res) => {
  axios
    .get("http://localhost:3002/api/query/videos/search", {
      headers: {
        ...req.headers,
        "x-api-key": INTERNAL_API_KEY, // Tambahkan API Key
      },
    })
    .then((response) => res.json(response.data))
    .catch((error) => res.status(error.response?.status || 500).json(error.response?.data || { message: "Error" }));
});

apiGateway.get("/videos/:id", (req, res) => {
  axios.get("http://localhost:3002/api/query/videos/" + req.params.id, {
    headers: {
      ...req.headers,
      "x-api-key": INTERNAL_API_KEY, // Tambahkan API Key
    },
  })
    .then((response) => res.json(response.data))
    .catch((error) => res.status(error.response?.status || 500).json(error.response?.data || { message: "Error" }));
});

apiGateway.listen(3005, () => console.log("API Gateway running on port 3005"));
