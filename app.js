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
    console.log("Let's build your engineering team");
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is the manager's name?",
            validate: answer => {
                // checking for empty input
                if (answer !== "") {
                    return true;
                }
                return "Please enter a valid name";
            }
        },
        {
            type: "input",
            name: "managerId",
            message: "What is the manager's id?",
            validate: answer => {
                // checking for negative input
                if (parseInt(answer) >= 0) {
                    return true;
                }
                return "IDs must be positive numbers";
            },
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is the manager's email?",
            validate: answer => {
                // checking for empty input
                if (answer !== "") {
                    return true;
                }
                return "Enter a valid email";
            },
        },
        {
            type: "input",
            name: "managerOffice",
            message: "What is the manager's office?",
            validate: answer => {
                // checking for negative input
                if (parseInt(answer) >= 0) {
                    return true;
                }
                
                return "Office number should be a positive number";
            }
        }]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOffice);
            // adding manager to the list of employees
            teamMembers.push(manager);
            // storing manager's ID
            idArray.push(answers.managerId)
            // creating the rest of the employees
            createTeam();
        })
}

function createTeam() {
    // choosing what kind of employee to create
    inquirer.prompt([{
        type: "list",
        name: "employeeType",
        message: "Which type of team member would you like to add?",
        choices: [
            "Engineer", "Intern", "I don't want to add any more employees"
        ]
    }]).then(answers => {
        if (answers.employeeType === "Engineer") {
            // creating an engineer employee
            createEngineer();
        }
        else if (answers.employeeType === "Intern") {
            // creating an intern employee
            createIntern();
        }
        else {
            //adding all the team members to the html
            const renderedHtml = render(teamMembers);
            fs.writeFile(outputPath, renderedHtml, function (err) {
                if (err) throw err;
                console.log("Team Members, Assemble!");
            })
        }
    })
}

function createEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is your engineer's name?",
            validate: answer => {
                // checking for empty input
                if (answer !== "") {
                    return true;
                }
                return ("Please enter a valid name")
            }
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is your engineer's ID?",
            validate: answer => {
                // checking if the ID has already been used
                if(idArray.includes(answer)){
                    return "ID already used";
                }
                // checking for negative input
                if (parseInt(answer) >= 0) {
                    return true;
                }
                return "IDs must be positive numbers";
            }
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is your Engineer's email",
            validate: answer => {
                // checking for empty input
                if (answer !== "") {
                    return true;
                }
                return "Enter a valid email";
            }
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is your Engineer's github",
            validate: answer => {
                // checking for empty input
                if (answer !== "") {
                    return true;
                }
                return "Enter a valid Github";
            }
        }]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            // adding new engineer to list of employess
            teamMembers.push(engineer);
            // storing engineer's ID
            idArray.push(answers.engineerId)
            createTeam();
        })
}

function createIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is your intern's name?",
            validate: answer => {
                // checking for empty input
                if (answer !== "") {
                    return true;
                }
                return ("Please enter a valid name")
            }
        },
        {
            type: "input",
            name: "internId",
            message: "What is your intern's ID?",
            validate: answer => {
                // checking if the ID has already been used
                if(idArray.includes(answer)){
                    return "ID already used";
                }
                // checking for negative input
                if (parseInt(answer) >= 0) {
                    return true;
                }
                return "IDs must be positive numbers"
            }
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is your intern's email",
            validate: answer => {
                // checking for empty input
                if (answer !== "") {
                    return true;
                }
                return "Enter a valid email";
            }
        },
        {
            type: "input",
            name: "internSchool",
            message: "What is your intern's school",
            validate: answer => {
                // checking for empty input
                if (answer !== "") {
                    return true;
                }
                return "Enter a valid school";
            }
        }]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            // adding intern to list of employees
            teamMembers.push(intern);
            // storing intern's ID
            idArray.push(answers.internId)
            createTeam();
        })
}
