//Dependencies
const inquirer = require("inquirer")
const fs = require("fs")

//Class imports
const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")

//Question bank import
const questionBank = require("./lib/questions")

//Array of our team members
const team = []

//Begins our chain of questions
managerPrompts(questionBank)

//Prompts the user with our manager prompts, then generates the manager and pushes it into team, then continues with more prompts
function managerPrompts({managerQuestions}){
    inquirer.prompt(managerQuestions)
    .then(data=>{
        generateManager(data)
        engineerOrIntern(questionBank)
    })
}

//Gives the user some choices and then asks them more prompts based on their choice. Or, it exits the program and generates the HTML
function engineerOrIntern({pickEngineervsIntern}){
    inquirer.prompt(pickEngineervsIntern)
    .then(data=>{
        switch(data.type){
            case "Engineer": engineerPrompts(questionBank)
            break
            case "Intern": internPrompts(questionBank)
            break
            case "I'm done adding members": generateHTML(team)
            break
            default: break
        }
    })
}

//Prompts the user with our engineer prompts, then generates the engineer and pushes it into team, then loops back to engineerOrIntern
function engineerPrompts({engineerQuestions}){
    inquirer.prompt(engineerQuestions)
    .then(data=>{
        generateEngineer(data)
        engineerOrIntern(questionBank)
    })
}

//Prompts the user with our intern prompts, then generates the engineer and pushes it into team, then loops back to engineerOrIntern
function internPrompts({internQuestions}){
    inquirer.prompt(internQuestions)
    .then(data=>{
        generateIntern(data)
        engineerOrIntern(questionBank)
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
        <div class="d-flex flex-column align-items-center" style="position:relative; min-height:100vh; padding-bottom: 10vh;">
            <nav class="navbar container-fluid d-flex justify-content-center bg-info opacity-25" style="border-radius: 0 0 10% 10%; height:15vh">
                <h1>My Team</h1>
            </nav>
            <main class="d-flex p-4 flex-wrap justify-content-center align-items-center"style="flex: 1 1 auto">
                ${buildCards(team)}
            </main>
            <footer class="container-fluid d-flex justify-content-center align-items-center bg-info opacity-25" style="border-radius: 10% 10% 0 0; height:10vh; position: absolute; bottom: 0;">
            <a href="https://github.com/scicluna" target="_blank" class="list-group-item"><i class="fa-brands fa-github" style="font-size:8vh;" ></i></a>
            </footer>
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
                <div class="card m-4" style="width: 15rem; opacity: 90%;  box-shadow: 1px 2px 3px 4px rgba(0, 0, 0, 0.581); word-break: break-all">
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