// ================================
// AMR Control Center
// Basic Node.js + Express Server
// ================================

const express = require("express");
const path = require("path");


// ================================
// Create Express Application
// ================================

const app = express();

const PORT =
    process.env.PORT || 3000;

const PUBLIC_DIR =
    path.join(__dirname, "public");


// ================================
// Request Logger
// ================================

app.use((req, res, next) => {

    const startTime = Date.now();


    res.on("finish", () => {

        const duration =
            Date.now() - startTime;


        console.log(
            `${req.method} ${req.originalUrl} ` +
            `→ ${res.statusCode} ` +
            `(${duration} ms)`
        );

    });


    next();

});


// ================================
// Static Files
// ================================

app.use(
    express.static(PUBLIC_DIR)
);


// ================================
// Robot Status API
// ================================

app.get(
    "/api/status",
    (req, res) => {

        const status = {

            robot: "McRae AMR",

            state: "ONLINE",

            battery: 82,

            mode: "AUTONOMOUS",

            speed: 0.45,

            position: {
                x: 2.4,
                y: 1.8
            },

            timestamp:
                new Date().toISOString()

        };


        res.json(status);

    }
);


// ================================
// Mission API
// ================================

app.get(
    "/api/mission",
    (req, res) => {

        res.json({

            mission: "Warehouse Survey",

            status: "RUNNING",

            progress: 68,

            target: "Zone C",

            obstaclesDetected: 2

        });

    }
);


// ================================
// Robot Page Route
// ================================

app.get(
    "/robot",
    (req, res) => {

        res.sendFile(
            path.join(
                PUBLIC_DIR,
                "robot.html"
            )
        );

    }
);


// ================================
// 404 Handler
// ================================

app.use(
    (req, res) => {

        res
            .status(404)
            .sendFile(
                path.join(
                    PUBLIC_DIR,
                    "404.html"
                )
            );

    }
);


// ================================
// Start Server
// ================================

app.listen(
    PORT,
    () => {

        console.log(
            `AMR Control Center running at ` +
            `http://localhost:${PORT}`
        );

    }
);