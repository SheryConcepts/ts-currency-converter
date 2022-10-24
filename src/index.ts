const inquirer = require("inquirer");
const CC = require("currency-converter-lt");


async function run() {
   try {
        const currs = await getCurrs();         
        const answers = await inquirer.prompt(
            [
                {
                    type: "list",
                    name: "from",
                    message: "enter the currency",
                    choices: currs ,
                },
                {
                    type: "input",
                    name: "amount",
                    message:"enter the amount",
                },
                {
                    type: "list",
                    name: "to",
                    message: "enter the target currency",
                    choices: currs ,
                },
            ]
        );
        const converted_curr = await new CC({from: answers.from, to: answers.to, amount: Number(answers.amount)}).convert();
        console.log(`--> ${converted_curr} ${answers.to}`);
   } catch (error) {
        console.log(error)
   } 
}


async function getCurrs() {
    try {
        const currs = await Object.entries(new CC().currencies).map((v: any) => {return {name: v[1], value: v[0]}})
        return currs
   } catch (err) {
        throw err
   } 
}

run();