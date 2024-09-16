const app = require("./src/app");
const connectDB = require("./src/config/db");

app.listen(5000,async()=>{
    console.log('Server is listening on port 5000');
    await connectDB();
});
