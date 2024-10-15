const fs = require('fs');
const { program } = require('commander');

program
    .requiredOption('-i, --input <file>', 'input file path')
    .option('-o, --output <file>', 'output file path')
    .option('-d, --display', 'display output in console');

program.parse(process.argv);

const options = program.opts();

if (!options.input) {
    console.error("Please, specify input file");
    process.exit(1);
}

if (!fs.existsSync(options.input)) {
    console.error("Cannot find input file");
    process.exit(1);
}

const data = JSON.parse(fs.readFileSync(options.input, 'utf-8'));

// Логіка для варіанту 6: фільтруємо дані по ключу "parent"
const filteredData = data.filter(item => item.parent === "BS3_BanksLiab");

if (filteredData.length === 0) {
    console.log("No relevant data found");
    process.exit(0);
}

// Формуємо результат у форматі "Назва показника: значення"
const result = filteredData.map(item => `${item.indicatorNameEng}:${item.value}`).join('\n');

// Якщо вказано параметр --output, записуємо результат у файл
if (options.output) {
    fs.writeFileSync(options.output, result);
}

// Якщо вказано параметр --display, виводимо результат у консоль
if (options.display) {
    console.log(result);
}

// Якщо не задано жодних параметрів виводу, нічого не робимо
