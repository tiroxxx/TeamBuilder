const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];

function mainMenu() {
    // creating manager and all of its characteristics
    createManager();
}

mainMenu();


function createManager() {
    console.log("Let's build your team");
    inquirer.prompt([{
        type: "input",
        name: "managerName",
        message: "What is the manager's name?",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "Please enter a valid name";
        },
        type: "input",
        name: "managerId",
        message: "What is the manager's id?",
        validate: answer => {
            if (parseInt(answer) >= 0) {
                return true;
            }
            return "IDs must be positive numbers";
        },
        type: "input",
        name: "managerEmail",
        message: "What is the manager's email?",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "Enter a valid email";
        },
        type: "input",
        name: "managerOffice",
        message: "What is the manager's office?",
        validate: answer => {
            if (parseInt(answer) >= 0) {
                return true;
            }
            return "Enter a valid email";
        }

    }]).then(answers => {
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, managerOffice);
        teamMembers.push(manager);
        idArray.push(answers.managerId)
        // creating the rest of the employess
        createTeam();
    })
}

function createTeam() {
    inquirer.prompt([{
        type: "list",
        name: "employeeType",
        message: "Which type of team member would you like to add?",
        choices: [
            "Engineer", "Intern", "I don't want to add any more employees"
        ]
    }]).then(answers => {
        if (answers.employeeType === "Engineer") {
            createEngineer();
        }
        else if(answers.employeeType === "Intern") {
            createEngineer();
        }
        else{
            return;
        }
    })
}



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
