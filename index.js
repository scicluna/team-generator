//Dependencies
const inquirer = require("inquirer")
const fs = require("fs")

//Class imports
const Employee = require("./lib/Employee")
const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")

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
        choices: ["Engineer", "Intern", "Neither"]
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

const team = []

function init(){
    managerPrompts(managerQuestions)
}
init()

function managerPrompts(questions){
    inquirer.prompt(questions)
    .then(data=>{
        generateManager(data)
        engineerOrIntern(pickEngineervsIntern)
    })
}

function engineerOrIntern(questions){
    inquirer.prompt(questions)
    .then(data=>{
        if (data.type === "Engineer") engineerPrompts(engineerQuestions)
        if (data.type === "Intern") internPrompts(internQuestions)
        if (data.type === "Neither") {
            generateHTML(team)
        }
    })
}

function engineerPrompts(questions){
    inquirer.prompt(questions)
    .then(data=>{
        generateEngineer(data)
        engineerOrIntern(pickEngineervsIntern)
    })
}

function internPrompts(questions){
    inquirer.prompt(questions)
    .then(data=>{
        generateIntern(data)
        engineerOrIntern(pickEngineervsIntern)
    })
}

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

function generateHTML(team){
    const html = writeHTML(team)
    writeToFile("./dist/index.html", html)
}

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
    <title>Team Members</title>
  </head>
  <body class="bg-warning-subtle">
    <div class="d-flex flex-column vh-100">
        <nav class="navbar bg-body-tertiary container-fluid d-flex justify-content-center bg-danger-subtle">
            <h1>My Team</h1>
        </nav>
        <main class="d-flex p-2 flex-wrap align-content-center justify-content-center ">
            ${buildCards(team)}
        </main>
    </div>
    </body>
  </html>
    `
}

function writeToFile(fileName, content){
    fs.writeFile(fileName, content, (err) =>
    err ? console.log(err) : console.log(`Successfully created ${fileName}`)
)}

function buildCards(team){
    const cards = team.map(member=>{

        let special;
        let specialDesc;
        let specialTag;
        let specialLink = ''
        let specialStyle = ''
        let specialTarget = ''
        if (member.getRole() == "Manager") {
            special = member.officeNumber
            specialTag = "li"
            specialDesc = "Office Number:"
        }
        if (member.getRole() == "Engineer") { 
            special = member.getGithub()
            specialTag = "a"
            specialDesc = "Github:"
            specialLink = `https://github.com/${special}`
            specialStyle = 'link-primary'
            specialTarget = '_blank'
        }
        if (member.getRole() == "Intern") { 
            special = member.getSchool()
            specialTag = "li"
            specialDesc = "School:"

        }

        return `
        <div class="card m-2" style="width: 16rem;">
            <div class="card-body">
                <h5 class="card-title">${member.getName()}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${member.getRole()}</h6>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${member.getId()}</li>
                    <a href="mailto:${member.getEmail()}"  class="list-group-item">Email: <span class="link-primary">${member.getEmail()}</span></a>
                    <${specialTag} href="${specialLink}" target="${specialTarget}" class="list-group-item">${specialDesc} <span class=${specialStyle}>${special}</span></${specialTag}>
                </ul>
            </div>
        </div>
        `
    })
    return cards.join("")
}

//PLAN: Sketch an HTML page in prototype
//Use Bootstrap to style it so that we dont need a css page to make it look good
//Grid size based on team size? How Am I going to do that? 
//How to make it dynamic to the team size and actually listing out details from the whole team?
//Like, I really wish I was using react now, because I feel like this would be easy.