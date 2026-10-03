const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const courses = [
    {
        id: 1,
        title: "HTML & CSS",
        level: "Beginner",
        icon: "🌐",
        description: "Learn how to create beautiful websites.",
        lessons: 18,
        duration: "6 hours"
    },
    {
        id: 2,
        title: "JavaScript",
        level: "Beginner",
        icon: "⚡",
        description: "Learn programming and interactive websites.",
        lessons: 24,
        duration: "9 hours"
    },
    {
        id: 3,
        title: "React",
        level: "Intermediate",
        icon: "⚛️",
        description: "Build modern frontend applications.",
        lessons: 20,
        duration: "8 hours"
    },
    {
        id: 4,
        title: "Node.js",
        level: "Intermediate",
        icon: "🟢",
        description: "Learn backend development with JavaScript.",
        lessons: 22,
        duration: "9 hours"
    },
    {
        id: 5,
        title: "Python",
        level: "Beginner",
        icon: "🐍",
        description: "Learn Python programming from basics.",
        lessons: 26,
        duration: "10 hours"
    },
    {
        id: 6,
        title: "Data Structures",
        level: "Intermediate",
        icon: "🧠",
        description: "Learn important data structures and algorithms.",
        lessons: 30,
        duration: "12 hours"
    }
];

let progress = {
    1: 68,
    2: 42,
    3: 15,
    4: 0,
    5: 35,
    6: 8
};


// Get all courses
app.get("/api/courses", (req, res) => {
    res.json(courses);
});


// Get one course
app.get("/api/courses/:id", (req, res) => {

    const course = courses.find(
        c => c.id === Number(req.params.id)
    );

    if (!course) {
        return res.status(404).json({
            message: "Course not found"
        });
    }

    res.json(course);
});


// Get progress
app.get("/api/progress", (req, res) => {
    res.json(progress);
});


// Update progress
app.post("/api/progress", (req, res) => {

    const { courseId, value } = req.body;

    if (!courseId || typeof value !== "number") {
        return res.status(400).json({
            message: "Invalid data"
        });
    }

    progress[courseId] = value;

    res.json({
        success: true,
        progress
    });
});


// Quiz API
app.post("/api/quiz", (req, res) => {

    const { answer } = req.body;

    if (answer === "JavaScript") {

        res.json({
            correct: true,
            message: "Correct answer! 🎉"
        });

    } else {

        res.json({
            correct: false,
            message: "Wrong answer. Try again!"
        });

    }
});


// Dashboard statistics
app.get("/api/stats", (req, res) => {

    const values = Object.values(progress);

    const average =
        Math.round(
            values.reduce((a, b) => a + b, 0) /
            values.length
        );

    res.json({
        courses: courses.length,
        hoursLearned: 24,
        averageProgress: average
    });
});


// Start server
app.listen(PORT, () => {

    console.log(
        `CodeLearn running at http://localhost:${PORT}`
    );

});
