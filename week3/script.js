const goalInput = document.getElementById("goalInput");
const generateBtn = document.getElementById("generateBtn");
const output = document.getElementById("output");
const loading = document.getElementById("loading");

generateBtn.addEventListener("click", async () => {

    const goal = goalInput.value.trim();

    if (goal === "") {
        alert("Please enter a goal.");
        return;
    }

    loading.textContent = "Generating task plan...";
    output.innerHTML = "";

    try {

        const response = await fetch("/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ goal })
        });

        const data = await response.json();

        loading.textContent = "";

        output.innerHTML = "";

        data.tasks.forEach((task, index) => {

            output.innerHTML += `
                <div class="card">
                    <h3>Step ${index + 1}</h3>
                    <p><strong>Task:</strong> ${task.task_name}</p>
                    <p><strong>Priority:</strong> ${task.priority}</p>
                    <p><strong>Estimated Time:</strong> ${task.estimated_time}</p>
                </div>
            `;

        });

    } catch (error) {

        loading.textContent = "";
        output.innerHTML = "<p style='color:red;'>Unable to generate task plan. Please try again.</p>";

    }

});