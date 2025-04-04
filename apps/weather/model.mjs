import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Weather app connected to MongoDB");
} catch (err) {
  console.error(`Error connecting Weather app to MongoDB: ${err}`);
  process.exit(1);
}

const connection = mongoose.connection;
const db = connection.useDb("manteca-weather");

const tempSchema = new mongoose.Schema({
  zip: {
    type: Number,
    required: true,
  },
  body: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 60 * 60 * 12,
  },
});

const Temps = db.model("Temperature", tempSchema);

export default Temps;
