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


const filteredData = data.filter(item => item.parent === "BS3_BanksLiab");

if (filteredData.length === 0) {
    console.log("No relevant data found");
    process.exit(0);
}


const result = filteredData
    .map(item => `${item.txten || 'indicator not found'}:${item.value}`)
    .join('\n');


if (!options.output && !options.display) {
    process.exit(0);
}


if (options.output) {
    fs.writeFileSync(options.output, result);
}


if (options.display) {
    console.log(result);
}
