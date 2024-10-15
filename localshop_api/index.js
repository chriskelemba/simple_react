const express = require("express");
const app = express();

const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const saleRoute = require("./routes/saleRoute");
const roleRoute = require("./routes/roleRoute");

const createError = require("http-errors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
require("./model/dbConnect");

app.use(helmet());

// const limiter = rateLimit({
//     max: 100,
//     windowMs: 60 * 60 * 1000,
//     message: "Too many requests from this IP, please try again in an hour.",
// })

// app.use("/api", limiter);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use("/api/product", productRoute);
app.use("/api/user", userRoute);
app.use("/api/sale", saleRoute);
app.use("/api/role", roleRoute);

// Handling 404 error
app.use(async(req, res, next) => {
    next(createError.NotFound())
});

// Error handling middleware
app.use((err, req, res, next) => {
    if (err.status === 401) {
        // Handling 401 Unauthorized error
        res.status(401).send({
            error: {
                status: 401,
                message: "Unauthorized: No Access"
            }
        });
    } else {
        // Handling other errors
        res.status(err.status || 500).send({
            error: {
                status: err.status || 500,
                message: err.message || "Internal Server Error"
            }
        });
    }
});

// Not Found middleware
app.use(async(req, res, next) => {
    next(createError.NotFound());
});

app.listen(process.env.port || 4000, function() {
    console.log("Now listening for requests on: http://localhost:4000");
});