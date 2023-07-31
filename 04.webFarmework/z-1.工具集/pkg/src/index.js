const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`What's your name?`, name => {
  console.log(`Hi ${name}!`);
  setTimeout(() => {
    readline.close();
  }, 5000)
});

//  可以使用 inquirer