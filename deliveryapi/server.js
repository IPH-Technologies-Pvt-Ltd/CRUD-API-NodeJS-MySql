const dotenv = require("dotenv");
const app = require("./app");
dotenv.config({ path: "./config.env" });


const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`App listiling on the port...${port}`);
});
