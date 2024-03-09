#!/usr/bin/env node

import path from "path";
import fs from "fs-extra";
import inquirer from "inquirer";
import { program } from "commander";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import camelCase from 'camelcase';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

program
  .version("1.0.0")
  .description("Setup CLI for a new Mynders app.")
  .option("-n, --name <type>", "Name of the project")
  .option("-i, --install", "Install dependencies immediately");

program.parse(process.argv);
const options = program.opts();

function installDependencies(projectPath) {
  console.log("Installing dependencies...");
  return new Promise((resolve, reject) => {
    const npmInstall = spawn("npm", ["install"], {
      stdio: "inherit",
      cwd: projectPath,
    });

    npmInstall.on("close", (code) => {
      if (code !== 0) {
        console.error("Error installing dependencies.");
        reject(new Error("Installation failed"));
        return;
      }
      console.log("Dependencies installed successfully.");
      resolve();
    });
  });
}

function formatToKebabCase(name) {
  // Convert any string to kebab-case
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, ""); // Remove any character that is not a-z, 0-9, or -
}

async function promptForMissingOptions(options) {
  const defaultProjectName = "my-mynders-app";
  const questions = [];

  if (!options.name) {
    questions.push({
      type: "input",
      name: "name",
      message: "Please enter a name for your project:",
      default: defaultProjectName,
    });
  }

  const answers = await inquirer.prompt(questions);
  const projectName = options.name || answers.name;

  return {
    ...options,
    originalName: projectName, // Store the original name
    directoryName: formatToKebabCase(projectName), // Use kebab-case for directory
    packageName: formatToKebabCase(projectName), // Use kebab-case for package.json
  };
}

async function updatePackageJsonName(projectPath, packageName) {
  const packageJsonPath = path.join(projectPath, "package.json");
  const packageJson = await fs.readJson(packageJsonPath);

  packageJson.name = packageName;

  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
}

// Function to update vite.config.ts
async function updateViteConfig(projectPath, projectName) {
  const viteConfigPath = path.join(projectPath, "vite.config.ts");
  let viteConfig = await fs.readFile(viteConfigPath, "utf8");

  // Generate names based on the project name
  const libName = camelCase(projectName, { pascalCase: true }); // Convert to CamelCase
  const fileName = formatToKebabCase(projectName);

  // Replace the lib name and fileName in the vite config
  viteConfig = viteConfig.replace(/name: ".*?"/, `name: "${libName}"`);
  viteConfig = viteConfig.replace(
    /fileName: \(format\) => `.*?`/,
    `fileName: (format) => \`${fileName}.\${format}.js\``
  );

  // Write the updated config back to the file
  await fs.writeFile(viteConfigPath, viteConfig);
}

async function copyBoilerplateFiles(options) {
  const projectPath = path.resolve(process.cwd(), options.directoryName);
  const sourcePath = path.resolve(__dirname, "./new-app-files");

  try {
    await fs.copy(sourcePath, projectPath);
    console.log(
      `Starter files for '${options.originalName}' (as '${options.packageName}') successfully created.`
    );
    await updatePackageJsonName(projectPath, options.packageName);
    await updateViteConfig(projectPath, options.originalName);

    console.log(
      `Navigate to your new project with 'cd ${options.directoryName}'.`
    );
    if (!options.install) {
      console.log("Run 'npm install' to install dependencies.");
    }
    console.log(
      "Run 'npm run dev' to start the development server. This will simulate how your app will appear once it's deployed within the Mynders ecosystem. Happy coding!"
    );
  } catch (err) {
    console.error("Error setting up the project:", err);
    process.exit(1);
  }

  if (options.install) {
    await installDependencies(projectPath).catch((err) => {
      console.error(err);
      process.exit(1);
    });
  }
}

async function main() {
  const filledOptions = await promptForMissingOptions(options);
  await copyBoilerplateFiles(filledOptions);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
