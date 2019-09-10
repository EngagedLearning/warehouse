const path = require("path");
const jetpack = require("fs-jetpack");
const { execSync } = require("child_process");
const archiver = require("archiver");

const makePackage = () => {
  const rootDir = jetpack.cwd(path.join(__dirname, ".."));
  const temp = rootDir.dir("packages-temp", { empty: true });

  rootDir.copy("dist", temp.path(), { overwrite: true });

  const pkgJson = rootDir.read("package.json", "json");

  // Remove development fields from package.json
  delete pkgJson.devDependencies;
  delete pkgJson.scripts;
  delete pkgJson.husky;
  delete pkgJson["lint-staged"];
  // Lambda includes AWS SDK so we can omit it to reduce package size
  delete pkgJson.dependencies["aws-sdk"];

  temp.write("package.json", pkgJson);

  execSync(`yarn install --cwd "${temp.path()}"`);
  temp.remove("node_modules/.yarn-integrity");

  const zipName = `${pkgJson.name}.zip`;
  const packages = rootDir.dir("packages");
  const archive = archiver("zip");
  const output = packages.createWriteStream(zipName);

  const promise = new Promise((resolve, reject) => {
    output.on("close", () => {
      temp.remove();
      resolve(packages.path(zipName));
    });
    archive.on("warning", reject);
    archive.on("error", reject);
  });

  archive.pipe(output);
  archive.directory(temp.path(), false);
  archive.finalize();

  return promise;
};

if (require.main === module) {
  makePackage()
    .then(fullPath => {
      console.log(`Package created at ${fullPath}`);
      return undefined;
    })
    .catch(console.error);
} else {
  module.exports = {
    makePackage,
  };
}
