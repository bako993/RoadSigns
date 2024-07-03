import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './dbConnetion.js';
import signRoutes from './routes/signs.js';
import adminRoutes from './routes/admins.js';

const app = express();
const port = process.env.PORT || 6500;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDatabase();

app.use('/admins', adminRoutes);
app.use('/signs', signRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
