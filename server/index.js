import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import exerciseRoutes from './routes/exercise.js';
import plansRoutes from './routes/plans.js';
import reviewRoutes from './routes/review.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(
  helmet.crossOriginResourcePolicy({
    policy: 'cross-origin',
  })
);
app.use(cors());

app.use('/auth', authRoutes);
app.use('/exercises', exerciseRoutes);
app.use('/plans', plansRoutes);
app.use('/reviews', reviewRoutes);

const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`${err} - did not connect`);
  });
