const fs = require("fs");
const inquirer = require("inquirer");
const generatehTML = require("./util/generateHtml");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const Manager = require("./lib/Manager.js");

const team =[];

const teamPromt = () =>{
    inquirer.prompt([
        {
            type:"input",
            name:"boss",
            message:"What is the new manager's name?"
        },
        {
            type:"input",
            name:"bossID",
            message:"What is the new manager's ID number?"
        },
        {
            type:"input",
            name:"bossEmail",
            message:"What is the new manager's email?"
        },
        {
            type:"input",
            name:"bossOfficeNumber",
            message:"What is the new manager's office number?"
        },
    ])
    .then((Response)=>{
        const bossMan = new Manager(
            Response.boss,
            Response.bossID,
            Response.bossEmail,
            Response.bossOfficeNumber
        );
        team.push(bossMan),
        addTeam();
    })
};
const newEngineer = () =>{
    inquirer.prompt([
        {
            type:"input",
            name:"engineer",
            message:"What is the new Engineer's name?"
        },
        {
            type:"input",
            name:"engineerID",
            message:"What is the new Engineer's ID number?"
        },
        {
            type:"input",
            name:"engineerEmail",
            message:"What is the new Engineer's email?"
        },
        {
            type:"input",
            name:"engineerGithub",
            message:"What is the new Engineer's Github username?"
        },
    ])
    .then((Response)=>{
        const engineer = new Engineer(
            Response.engineer,
            Response.engineerID,
            Response.engineerEmail,
            Response.engineerGithub
        );
        team.push(engineer),
        addTeam();
    })
};

const newIntern = () =>{
    inquirer.prompt([
        {
            type:"input",
            name:"intern",
            message:"What is the new intern's name?"
        },
        {
            type:"input",
            name:"internID",
            message:"What is the new intern's ID number?"
        },
        {
            type:"input",
            name:"internEmail",
            message:"What is the new intern's email?"
        },
        {
            type:"input",
            name:"internSchool",
            message:"What is the new intern's school?"
        },
    ])
    .then((Response)=>{
        const intern = new Intern(
            Response.intern,
            Response.internID,
            Response.internEmail,
            Response.internSchool
        );
        team.push(intern),
        addTeam();
    })
};
const finishTeam=()=>{
    fs.writeFile("./assets/index.html",generatehTML(team),(err)=>err?console.error(err):console.log("Team Made!"))
};

const addTeam=()=>{
    inquirer.prompt([
        {
            type:"list",
            choices:["Engineer","Intern","No more members"],
            name:"questions",
            message:"Do you want to add more members?"
        }
    ])
    .then((ans)=>{
        switch(ans.questions){
            case "Engineer":
                newEngineer();
                break;

            case "Intern":
                newIntern();
                break;
            
            case "No more members":
                finishTeam();
        }
    })
};
//     .then((ans)=>{
//         if(ans === "Engineer"){
//             newEngineer(); return(teamPromt)
//         } else if (ans==="Intern"){
//             newIntern(); return
//         } else {
//             finishTeam();
//         }
//     });
// };



teamPromt();