import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (update with your MongoDB URI if needed)
mongoose.connect('mongodb://localhost:27017/bank', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Schema for Insurance Applications
const applicationSchema = new mongoose.Schema({
  type: String,
  formData: Object,
  recipientAddress: String,
});

const Application = mongoose.model('insuranceApplication', applicationSchema);

// Schema for Insurance Claims
const claimSchema = new mongoose.Schema({
  policyType: String,
  description: String,
  date: { type: Date, default: Date.now },
});

const Claim = mongoose.model('Claim', claimSchema);

// Route to save application data
app.post('/applications', async (req, res) => {
  try {
    const { type, formData, recipientAddress } = req.body;

    const newApplication = new Application({
      type,
      formData,
      recipientAddress,
    });

    await newApplication.save();
    res.status(201).send({ message: 'Application saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while saving the application.' });
  }
});

// Route to submit insurance claims
app.post('/claims', async (req, res) => {
  try {
    const { policyType, description } = req.body;

    if (!policyType || !description) {
      return res.status(400).send({ error: 'Policy type and description are required.' });
    }

    const newClaim = new Claim({ policyType, description });
    await newClaim.save();

    res.status(201).send({ message: 'Claim submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while submitting the claim.' });
  }
});

// Route to fetch all claims
app.get('/claims', async (req, res) => {
  try {
    const claims = await Claim.find();
    res.status(200).send(claims);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while fetching claims.' });
  }
});

// Route to fetch all applications
app.get('/applications', async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).send(applications);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while fetching applications.' });
  }
});

// Start the server
const PORT = 5008;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
