//Dependencies
const inquirer = require("inquirer")
const fs = require("fs")

//Class imports
const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")

//Question Banks
const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the name of this team's manager?"
    },
    {
        type: "input",
        name: "id",
        message: "What is their employee ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is their email address?"
    },
    {
        type: "input",
        name: "office",
        message: "What is their office number?"
    },
]
const pickEngineervsIntern = [
    {
        type: "list",
        name: "type",
        message: "Would you like to add an Engineer or Intern?",
        choices: ["Engineer", "Intern", "I'm done adding members"]
    }
]
const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the engineer's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is their ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is their email?"
    },
    {
        type: "input",
        name: "github",
        message: "What is their github username?"
    },
]
const internQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the intern's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is their ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is their email?"
    },
    {
        type: "input",
        name: "school",
        message: "What school do they go to"
    },
]

//Array of our team members
const team = []

//Begins our chain of questions
managerPrompts(managerQuestions)

//Prompts the user with our manager prompts, then generates the manager and pushes it into team, then continues with more prompts
function managerPrompts(questions){
    inquirer.prompt(questions)
    .then(data=>{
        generateManager(data)
        engineerOrIntern(pickEngineervsIntern)
    })
}

//Gives the user some choices and then asks them more prompts based on their choice. Or, it exits the program and generates the HTML
function engineerOrIntern(questions){
    inquirer.prompt(questions)
    .then(data=>{
        switch(data.type){
            case "Engineer": engineerPrompts(engineerQuestions)
            break
            case "Intern": internPrompts(internQuestions)
            break
            case "I'm done adding members": generateHTML(team)
            break
            default: break
        }
    })
}

//Prompts the user with our engineer prompts, then generates the engineer and pushes it into team, then loops back to engineerOrIntern
function engineerPrompts(questions){
    inquirer.prompt(questions)
    .then(data=>{
        generateEngineer(data)
        engineerOrIntern(pickEngineervsIntern)
    })
}

//Prompts the user with our intern prompts, then generates the engineer and pushes it into team, then loops back to engineerOrIntern
function internPrompts(questions){
    inquirer.prompt(questions)
    .then(data=>{
        generateIntern(data)
        engineerOrIntern(pickEngineervsIntern)
    })
}

//Generates a new team member and pushes them into the team array
function generateManager({name, id, email, office}){
    const manager = new Manager(name, id, email, office)
    team.push(manager)
}
function generateEngineer({name, id, email, github}){
    const engineer = new Engineer(name, id, email, github)
    team.push(engineer)
}
function generateIntern({name, id, email, school}){
    const intern = new Intern(name, id, email, school)
    team.push(intern)
}

//Handles our html generation and passes it in to our writeToFile function
function generateHTML(team){
    const html = writeHTML(team)
    writeToFile("./dist/index.html", html)
}

//Returns our html frame leveraging buildCards as a helper function
function writeHTML(team){
    return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
      crossorigin="anonymous" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
    <title>Team Members</title>
  </head>
  <body class="bg-primary">
    <div class="d-flex flex-column vh-100 align-items-center">
        <nav class="navbar container-fluid d-flex justify-content-center bg-info opacity-25" style="border-radius: 0 0 10% 10%;">
            <h1>My Team</h1>
        </nav>
        <main class="d-flex p-2 flex-wrap align-content-center justify-content-center">
            ${buildCards(team)}
        </main>
    </div>
    </body>
  </html>
        `
}

//Writes the html file
function writeToFile(fileName, content){
    fs.writeFile(fileName, content, (err) =>
    err ? console.log(err) : console.log(`Successfully created ${fileName}`)
)}

//Builds out our team cards with html. Uses a switch and template literals to dynamically produce cards based on each team member's roles.
function buildCards(team){
    const cards = team.map(member=>{

        let special;
        let specialDesc;
        let specialTag;
        let specialSymbol;
        let specialLink = ''
        let specialStyle = ''
        let specialTarget = ''

        switch(member.getRole()){
            case "Manager": {
                special = member.officeNumber
                specialTag = "li"
                specialDesc = "Office #:"
                specialSymbol = `<i class="fa-solid fa-mug-hot"></i>`
                break
            }
            case "Engineer": {
                special = member.getGithub()
                specialTag = "a"
                specialDesc = `<i class="fa-brands fa-github"></i>`
                specialLink = `https://github.com/${special}`
                specialStyle = 'link-primary'
                specialTarget = '_blank'
                specialSymbol = `<i class="fa-solid fa-gear"></i>`
                break
            }
            case "Intern" : {
                special = member.getSchool()
                specialTag = "li"
                specialDesc = `<i class="fa-solid fa-school"></i>`
                specialSymbol = `<i class="fa-sharp fa-solid fa-graduation-cap"></i>`
                break
            }
            default: break
        }

        return `
        <div class="card m-4" style="width: 14rem; opacity: 90%;  box-shadow: 1px 2px 3px 4px rgba(0, 0, 0, 0.581)">
            <div class="card-body">
                <h5 class="card-title">${member.getName()}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${specialSymbol} ${member.getRole()}</h6>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${member.getId()}</li>
                    <a href="mailto:${member.getEmail()}"  class="list-group-item"><i class="fa fa-envelope""></i> <span class="link-primary">${member.getEmail()}</span></a>
                    <${specialTag} href="${specialLink}" target="${specialTarget}" class="list-group-item">${specialDesc} <span class=${specialStyle}>${special}</span></${specialTag}>
                </ul>
            </div>
        </div>`
    })
    return cards.join("")
}

//PLAN:
