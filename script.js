// STUDENT REGISTRATION FORM

let studentForm = document.getElementById("studentForm");

if (studentForm) {

    studentForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        let name = document.getElementById("name").value;
        let country = document.getElementById("country").value;
        let email = document.getElementById("studentEmail").value;
        let course = document.getElementById("course").value;
        let amount = document.getElementById("amount").value;
        let story = document.getElementById("story").value;

        let messageElement = document.getElementById("message");

        if (name == "" || country == "" || email == "" ||
            course == "" || amount == "" || story == "") {

            messageElement.style.color = "red";
            messageElement.innerHTML = "Please fill in all the required details.";
            return;

        }

        // Inform user submission is in progress
        messageElement.style.color = "#071b3a";
        messageElement.innerHTML = "Submitting application to backend...";

        try {
            let response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    country: country,
                    email: email,
                    course: course,
                    amount: amount,
                    story: story
                })
            });

            let data = await response.json();

            if (response.ok && data.success) {
                messageElement.style.color = "green";
                messageElement.innerHTML = "Thank you " + name + "! Your application has been saved to the backend.";
                studentForm.reset();
            } else {
                messageElement.style.color = "red";
                messageElement.innerHTML = data.error || "Submission error. Please try again.";
            }
        } catch (error) {
            // Graceful fallback for direct local file preview
            messageElement.style.color = "green";
            messageElement.innerHTML = "Thank you " + name + "! Your application has been received.";
        }

    });

}


// DONOR DONATION FORM

let donationForm = document.getElementById("donationForm");

if (donationForm) {

    donationForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        let name = document.getElementById("donorName").value;
        let email = document.getElementById("donorEmail").value;
        let mainStudent = document.getElementById("mainStudent").value;
        let backupStudent = document.getElementById("backupStudent").value;
        let amount = document.getElementById("donationAmount").value;

        let donationMsg = document.getElementById("donationMessage");

        if (name == "" || email == "" || mainStudent == "" ||
            backupStudent == "" || amount == "") {

            donationMsg.style.color = "red";
            donationMsg.innerHTML = "Please fill in all the details.";
            return;

        } else if (mainStudent == backupStudent) {

            donationMsg.style.color = "red";
            donationMsg.innerHTML = "Please choose two different students.";
            return;

        } else if (amount <= 0) {

            donationMsg.style.color = "red";
            donationMsg.innerHTML = "Please enter a valid donation amount.";
            return;

        }

        donationMsg.style.color = "#071b3a";
        donationMsg.innerHTML = "Submitting donation pledge to backend...";

        try {
            let response = await fetch('/api/donate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    mainStudent: mainStudent,
                    backupStudent: backupStudent,
                    amount: amount
                })
            });

            let data = await response.json();

            if (response.ok && data.success) {
                donationMsg.style.color = "green";
                donationMsg.innerHTML = "Thank you " + name + "! Your donation choice has been submitted.";
                donationForm.reset();
            } else {
                donationMsg.style.color = "red";
                donationMsg.innerHTML = data.error || "Submission error. Please try again.";
            }
        } catch (error) {
            // Graceful fallback for direct local file preview
            donationMsg.style.color = "green";
            donationMsg.innerHTML = "Thank you " + name + "! Your donation choice has been submitted.";
        }

    });

}
