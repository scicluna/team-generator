//Question Bank
const questionBank = {
    managerQuestions : [
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
    ],
    pickEngineervsIntern : [
        {
            type: "list",
            name: "type",
            message: "Would you like to add an Engineer or Intern?",
            choices: ["Engineer", "Intern", "I'm done adding members"]
        }
    ],
    engineerQuestions : [
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
    ],
    internQuestions : [
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
}

module.exports = questionBank