let courses = [];


// Load courses
async function loadCourses() {

    const response =
        await fetch("/api/courses");

    courses = await response.json();

    displayCourses(courses);

    loadStats();
}


// Display courses
function displayCourses(list) {

    const container =
        document.getElementById("courseGrid");

    container.innerHTML = "";

    list.forEach(course => {

        const card = document.createElement("div");

        card.className = "course";

        card.innerHTML = `

            <div class="course-icon">
                ${course.icon}
            </div>

            <h3>
                ${course.title}
            </h3>

            <p>
                ${course.description}
            </p>

            <div class="course-info">

                <span>
                    ${course.level}
                </span>

                <span>
                    ${course.lessons} lessons
                </span>

            </div>

            <div class="progress">

                <div style="width: 0%">
                </div>

            </div>

        `;

        container.appendChild(card);

    });
}


// Filter courses
function filterCourses(level) {

    if (level === "All") {

        displayCourses(courses);

    } else {

        const filtered =
            courses.filter(
                course => course.level === level
            );

        displayCourses(filtered);
    }
}


// Load dashboard statistics
async function loadStats() {

    const response =
        await fetch("/api/stats");

    const data =
        await response.json();

    document.getElementById(
        "courseCount"
    ).textContent = data.courses;

    document.getElementById(
        "hours"
    ).textContent = data.hoursLearned;

    document.getElementById(
        "average"
    ).textContent =
        data.averageProgress + "%";
}


// Quiz
async function answerQuiz(answer) {

    const response =
        await fetch("/api/quiz", {

            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                answer: answer
            })
        });

    const data =
        await response.json();

    const result =
        document.getElementById(
            "quizResult"
        );

    result.textContent =
        data.message;

    result.style.color =
        data.correct
            ? "#6ee7b7"
            : "#ff8f8f";
}


// Scroll to courses
function goToCourses() {

    document
        .getElementById("courses")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// Login modal
function showLogin() {

    document
        .getElementById("loginModal")
        .classList.add("show");
}


function closeLogin() {

    document
        .getElementById("loginModal")
        .classList.remove("show");
}


// Start application
loadCourses();
