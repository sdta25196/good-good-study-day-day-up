import ora from 'ora';

const spinner = ora('Loading unicorns').start();

setTimeout(() => {
	spinner.color = 'red';
	spinner.text = 'Loading rainbows';
}, 1000);