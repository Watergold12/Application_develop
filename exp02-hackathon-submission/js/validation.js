// =========================
// Get HTML elements
// =========================

const form = document.getElementById("projectForm");

const successBox = document.getElementById("successBox");


// =========================
// Validation Patterns
// =========================

const patterns = {

    projectName: /^[A-Za-z0-9][A-Za-z0-9 ._-]{2,49}$/,

    email: /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/,

    github:
        /^https:\/\/github\.com\/[A-Za-z0-9_-]+\/[A-Za-z0-9_.-]+$/

};


// =========================
// Show Error
// =========================

function showError(input, message) {

    const error =
        document.getElementById(
            input.id + "Error"
        );

    error.textContent = message;

    input.classList.add("invalid");

    input.classList.remove("valid");

    return false;
}


// =========================
// Show Success
// =========================

function showSuccess(input) {

    const error =
        document.getElementById(
            input.id + "Error"
        );

    error.textContent = "";

    input.classList.remove("invalid");

    input.classList.add("valid");

    return true;
}


// =========================
// Field Validators
// =========================

const validators = {

    projectName(input) {

        const value =
            input.value.trim();


        if (value === "") {

            return showError(
                input,
                "Project name is required"
            );
        }


        if (!patterns.projectName.test(value)) {

            return showError(
                input,
                "Use 3-50 letters, numbers, spaces or _ - ."
            );
        }


        return showSuccess(input);
    },


    category(input) {

        if (input.value === "") {

            return showError(
                input,
                "Please select a category"
            );
        }


        return showSuccess(input);
    },


    teamSize(input) {

        const value =
            Number(input.value);


        if (input.value === "") {

            return showError(
                input,
                "Team size is required"
            );
        }


        if (value < 1 || value > 4) {

            return showError(
                input,
                "Team size must be between 1 and 4"
            );
        }


        return showSuccess(input);
    },


    email(input) {

        const value =
            input.value.trim();


        if (value === "") {

            return showError(
                input,
                "Email is required"
            );
        }


        if (!patterns.email.test(value)) {

            return showError(
                input,
                "Enter a valid email address"
            );
        }


        return showSuccess(input);
    },


    github(input) {

        const value =
            input.value.trim();


        if (value === "") {

            return showError(
                input,
                "GitHub repository URL is required"
            );
        }


        if (!patterns.github.test(value)) {

            return showError(
                input,
                "Enter a valid GitHub repository URL"
            );
        }


        return showSuccess(input);
    },


    date(input) {

        if (input.value === "") {

            return showError(
                input,
                "Submission date is required"
            );
        }


        const selectedDate =
            new Date(input.value);


        const today =
            new Date();


        today.setHours(0, 0, 0, 0);


        if (selectedDate < today) {

            return showError(
                input,
                "Submission date cannot be in the past"
            );
        }


        return showSuccess(input);
    },


    tech(input) {

        const value =
            input.value.trim();


        if (value === "") {

            return showError(
                input,
                "Technology stack is required"
            );
        }


        if (value.length < 3) {

            return showError(
                input,
                "Enter at least one technology"
            );
        }


        return showSuccess(input);
    },


    description(input) {

        const value =
            input.value.trim();


        if (value === "") {

            return showError(
                input,
                "Project description is required"
            );
        }


        if (value.length < 30) {

            return showError(
                input,
                "Description must contain at least 30 characters"
            );
        }


        return showSuccess(input);
    }

};


// =========================
// Terms Validation
// =========================

function validateTerms() {

    const terms =
        document.getElementById("terms");

    const error =
        document.getElementById("termsError");


    if (!terms.checked) {

        error.textContent =
            "You must confirm the information";

        return false;
    }


    error.textContent = "";

    return true;
}


// =========================
// Live Validation
// =========================

Object.keys(validators).forEach((id) => {

    const input =
        document.getElementById(id);


    input.addEventListener(
        "blur",
        () => validators[id](input)
    );


    input.addEventListener(
        "input",
        () => {

            if (
                input.classList.contains("invalid") ||
                input.classList.contains("valid")
            ) {

                validators[id](input);
            }

        }
    );

});


// =========================
// Form Submission
// =========================

form.addEventListener(
    "submit",
    (event) => {

        // Stop normal form submission
        event.preventDefault();


        let allValid = true;


        // Validate every field
        Object.keys(validators).forEach((id) => {

            const input =
                document.getElementById(id);


            if (!validators[id](input)) {

                allValid = false;
            }

        });


        // Validate checkbox
        if (!validateTerms()) {

            allValid = false;
        }


        // If something is invalid
        if (!allValid) {

            successBox.classList.add("hidden");

            const firstInvalid =
                form.querySelector(".invalid");


            if (firstInvalid) {

                firstInvalid.focus();
            }

            return;
        }


        // =========================
        // Successful Submission
        // =========================

        const data =
            new FormData(form);


        const projectName =
            data.get("projectName");

        const category =
            data.get("category");

        const teamSize =
            data.get("teamSize");

        const github =
            data.get("github");


        successBox.innerHTML = `

            <h3>
                ✓ Project Submitted Successfully
            </h3>

            <table>

                <tr>
                    <td>Project</td>
                    <td>${escapeHTML(projectName)}</td>
                </tr>

                <tr>
                    <td>Category</td>
                    <td>${escapeHTML(category)}</td>
                </tr>

                <tr>
                    <td>Team Size</td>
                    <td>${escapeHTML(teamSize)}</td>
                </tr>

                <tr>
                    <td>Repository</td>
                    <td>${escapeHTML(github)}</td>
                </tr>

            </table>

        `;


        successBox.classList.remove("hidden");

    }
);


// =========================
// Prevent HTML Injection
// =========================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// =========================
// Reset Form
// =========================

form.addEventListener(
    "reset",
    () => {

        form
            .querySelectorAll(
                "input, select, textarea"
            )
            .forEach((element) => {

                element.classList.remove(
                    "valid",
                    "invalid"
                );

            });


        form
            .querySelectorAll(".error")
            .forEach((error) => {

                error.textContent = "";

            });


        successBox.classList.add("hidden");

    }
);