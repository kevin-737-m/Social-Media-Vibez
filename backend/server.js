const app = require("./src/app.js");
const connectdb = require("./src/db/db.js");
require("dotenv").config();

connectdb()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });