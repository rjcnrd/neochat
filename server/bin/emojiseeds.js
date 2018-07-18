const mongoose = require("mongoose");


const dbName = "neoChat";
mongoose.connect(`mongodb://localhost/${dbName}`);

