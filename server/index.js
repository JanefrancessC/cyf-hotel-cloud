import express from "express";
import cors from "cors";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 80;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BOOKINGS_FILE = path.join(__dirname, "data", "fakeBookings.json");

app.use(cors());
app.use(express.json());

// GET all bookings
app.get("/api/bookings", async (req, res) => {
  try {
    const data = await fs.readFile(BOOKINGS_FILE, "utf8");
    const bookings = JSON.parse(data);
    res.json(bookings);
  } catch (error) {
    console.error("Error reading bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// POST a new booking
app.post("/api/bookings", async (req, res) => {
  try {
    const {
      title,
      firstName,
      surname,
      email,
      roomId,
      checkInDate,
      checkOutDate,
    } = req.body;
    // Basic validation
    if (!firstName || !surname || !email.includes("@") || isNaN(roomId)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    // Read current bookings
    const data = await fs.readFile(BOOKINGS_FILE, "utf8");
    const bookings = JSON.parse(data);

    // Create new booking
    const newBooking = {
      id: bookings.length ? Math.max(...bookings.map((b) => b.id)) + 1 : 1,
      title,
      firstName,
      surname,
      email,
      roomId: parseInt(roomId),
      checkInDate,
      checkOutDate,
    };

    // Add to bookings and save
    bookings.push(newBooking);
    await fs.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));

    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error adding booking:", error);
    res.status(500).json({ error: "Failed to add booking" });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
