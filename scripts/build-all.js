const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get the current working directory of the package running the script
const currentPackageDir = process.cwd();

function getGlobalName() {
    // Function to convert a string to PascalCase (UpperCamelCase)
    function toPascalCase(str) {
        return str
            .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase()) // Convert to CamelCase
            .replace(/^([a-z])/, (match) => match.toUpperCase()); // Capitalize the first character
    }

    // Read package.json
    const packageJsonPath = path.join(currentPackageDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Convert the package name to PascalCase for globalName
    const packageName = packageJson.name || 'default-name';
    const sanitizedPackageName = packageName.replace(/[^a-zA-Z0-9]/g, ' '); // Remove non-alphanumeric characters
    const globalName = toPascalCase(sanitizedPackageName);
    return {packageName,globalName} 
}

const {globalName,packageName} = getGlobalName();
console.log(`Using globalName: ${globalName} for UMD builds`);

// Build ESM
const buildEsmCommand = `bun build ${path.join(currentPackageDir, 'src/index.ts')} --outdir ${path.join(currentPackageDir, 'dist/es')}`;
console.log(`Running: ${buildEsmCommand}`);
execSync(buildEsmCommand, { stdio: 'inherit' });

// Build CJS
const buildCjsCommand = `esbuild ${path.join(currentPackageDir, 'src/index.ts')} --bundle --outfile=${path.join(currentPackageDir, 'dist/index.cjs.js')} --format=cjs`;
console.log(`Running: ${buildCjsCommand}`);
execSync(buildCjsCommand, { stdio: 'inherit' });

// Build UMD
const buildUmdCommand = `esbuild ${path.join(currentPackageDir, 'src/index.ts')} --bundle --outfile=${path.join(currentPackageDir, 'dist/index.umd.js')} --format=iife --global-name=${globalName}`;
console.log(`Running: ${buildUmdCommand}`);
execSync(buildUmdCommand, { stdio: 'inherit' });

// Minify CJS and UMD
const buildMinifyCommand = `esbuild ${path.join(currentPackageDir, 'dist/index.cjs.js')} --outfile=${path.join(currentPackageDir, 'dist/index.cjs.min.js')} --minify --sourcemap && esbuild ${path.join(currentPackageDir, 'dist/index.umd.js')} --outfile=${path.join(currentPackageDir, 'dist/index.umd.min.js')} --minify --sourcemap`;
console.log(`Running: ${buildMinifyCommand}`);
execSync(buildMinifyCommand, { stdio: 'inherit' });

// Build TypeScript types 
// ensure it uses the tsconfig.json in the current package
const buildTypesCommand = `tsc --emitDeclarationOnly --outdir ${path.join(currentPackageDir, 'dist/es')} --project ${path.join(currentPackageDir, 'tsconfig.json')}`;  
console.log(`Running: ${buildTypesCommand}`);
execSync(buildTypesCommand, { stdio: 'inherit' });


console.log(`** ${packageName} ** : All builds completed successfully.`);
