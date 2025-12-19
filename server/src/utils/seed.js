const mongoose = require("mongoose");
const User = require("../models/user");
const connectDB = require("../config/database");

const seedUsers = async () => {
  try {
    await connectDB();
    console.log("Database connected for seeding...");

    await User.deleteMany({}); // Clear existing users
    console.log("Existing users cleared.");

    const users = [];
    const firstNames = [
      "Aarav", "Vihaan", "Aditya", "Sairam", "Arjun", "Reyansh", "Muhammad", "Aryan", "Vivaan", "Krishna",
      "Ishaan", "Shaurya", "Atharv", "Advik", "Pranav", "Advaith", "Ayaan", "Dhruv", "Kabir", "Ritvik",
      "Aanya", "Divya", "Saanvi", "Aadhya", "Parin", "Ananya", "Myra", "Riya", "Aaradhya", "Kiara",
      "Iraa", "Amaira", "Fatima", "Zoyaa", "Siya", "Kavya", "Zara", "Khushi", "Aisha", "Anika"
    ];
    const lastNames = [
      "Sharma", "Verma", "Gupta", "Malhotra", "Bhatia", "Mehta", "Joshi", "Nair", "Patel", "Reddy",
      "Singh", "Yadav", "Kumar", "Das", "Chopra", "Desai", "Rao", "Iyer", "Khan", "Fernandes"
    ];

    for (let i = 0; i < 50; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const gender = Math.random() > 0.5 ? "male" : "female";
        const skills = ["JavaScript", "React", "Node.js", "MongoDB", "Express", "HTML", "CSS", "Python", "Java", "C++", "AWS", "Docker"].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 5) + 1);
        
        users.push({
            firstName,
            lastName,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
            password: "$2b$10$X7h.mSg8v.kl8w.h.8j.e.6g.h.9j.k.l.m.n.o.p", // Hash of "password" (placeholder)
            age: Math.floor(Math.random() * 20) + 18,
            gender,
            about: `Hello, I am ${firstName}. I am a developer passionate about ${skills[0]}.`,
            photoUrl: `https://randomuser.me/api/portraits/${gender === "male" ? "men" : "women"}/${Math.floor(Math.random() * 100)}.jpg`,
            skills
        });
    }

    await User.insertMany(users);
    console.log("50 dummy users added successfully!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedUsers();
