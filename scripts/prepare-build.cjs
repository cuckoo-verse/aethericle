const fs = require('fs-extra');
const path = require('path');

const rootDir = path.resolve(__dirname, '../../../');
const appDir = path.resolve(__dirname, '../');
const packagesDir = path.join(rootDir, 'packages');

const dependencies = ['auth', 'db'];

// This filter function ensures we only copy source code and necessary files,
// excluding development-related directories and build artifacts.
const copyFilter = (src) => {
  const excludedDirs = ['node_modules', 'dist', '.turbo', '.git'];
  const isExcluded = excludedDirs.some(dir => src.includes(path.join(dir)));
  if (isExcluded) {
    return false;
  }
  return true;
};

async function copyWorkspaceDependencies() {
  try {
    const tempModulesDir = path.join(appDir, 'node_modules', '@cuckoo-verse');
    fs.ensureDirSync(tempModulesDir);
    
    console.log('Starting to copy workspace dependencies intelligently...');
    
    for (const dep of dependencies) {
      const srcDir = path.join(packagesDir, dep);
      const destDir = path.join(tempModulesDir, dep);
      
      console.log(`Copying essential files from ${dep} to ${destDir}`);
      
      fs.copySync(srcDir, destDir, { filter: copyFilter });
    }
    
    console.log('Workspace dependencies copied successfully!');
  } catch (error) {
    console.error('Error copying workspace dependencies:', error);
    process.exit(1);
  }
}

copyWorkspaceDependencies(); 