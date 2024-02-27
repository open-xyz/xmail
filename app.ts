import express from "express";
import usersRouter from "./src/routes/authRoutes";

const app = express();
app.use(express.json());

app.use("/api/users", usersRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
