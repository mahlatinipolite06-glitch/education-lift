
// STUDENT REGISTRATION FORM

let studentForm = document.getElementById("studentForm");

if (studentForm) {

    studentForm.addEventListener("submit", function(event) {

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

        } else {

            messageElement.style.color = "green";
            messageElement.innerHTML = "Thank you " + name + "! Your application has been received.";

        }

    });

}


// DONOR DONATION FORM

let donationForm = document.getElementById("donationForm");

if (donationForm) {

    donationForm.addEventListener("submit", function(event) {

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

        } else if (mainStudent == backupStudent) {

            donationMsg.style.color = "red";
            donationMsg.innerHTML = "Please choose two different students.";

        } else if (amount <= 0) {

            donationMsg.style.color = "red";
            donationMsg.innerHTML = "Please enter a valid donation amount.";

        } else {

            donationMsg.style.color = "green";
            donationMsg.innerHTML = "Thank you " + name + "! Your donation choice has been submitted.";

        }

    });

}
