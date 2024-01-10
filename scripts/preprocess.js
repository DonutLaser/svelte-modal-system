import fs from 'fs-extra';
import { glob } from 'glob';
import path from 'path';
import {preprocess} from 'svelte/compiler';
import sveltePreprocess from 'svelte-preprocess';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const basePath = path.resolve(__dirname, "../");
const srcPath = path.resolve(basePath, "src");
const distPath = path.resolve(basePath, "dist");
const tsPath = path.join(distPath, "ts");

/**
 * This will process .svelte files into plain javascript so consumers do not have to setup Typescript to use this library
 *
 * Additionally, it will move the .d.ts files into /dist/ts
 */
async function main() {
  // --- Get all .svelte files and preprocess them ---
  const svelteFiles = await glob(path.join(srcPath, "**/*.svelte"), { ignore: 'node_modules/**', windowsPathsNoEscape:true});
  await Promise.all(svelteFiles.map((filePath) => preprocessSvelte(path.resolve(filePath))))

  // --- Move .d.ts files into /dist/ts ---
  const dtsFiles = await glob(path.join(distPath, "**/*.d.ts"), { ignore: 'node_modules/**', windowsPathsNoEscape:true})
  await Promise.all(
    dtsFiles.map(async (filePath) => {
      filePath = path.resolve(filePath)
      // Ignore anything in /dist/ts (could probably make a better glob pattern)
      if (!filePath.includes(tsPath)) { 
        await fs.move(filePath, filePath.replace(distPath, tsPath), {
          overwrite: true,
        });
      }
    })
  )
}

/**
 * Processes .svelte file and write it to /dist, also copies the original .svelte file to /dist/ts
 */
async function preprocessSvelte(filePath) {
  const srcCode = await fs.readFile(filePath, { encoding: "utf-8" });
  let { code } = await preprocess(
    srcCode,
    sveltePreprocess({
      // unfortunately, sourcemap on .svelte files sometimes comments out the </script> tag
      // so we need to disable sourcemapping for them
      sourceMap: false,
      typescript: {
        compilerOptions: {
          sourceMap: false,
        },
      },
    }),
    {
      filename: filePath,
    }
  );

  // remove lang=ts from processed .svelte files
  code = code.replace(/script lang="ts"/g, "script");

  const relativePath = filePath.split(srcPath)[1];
  const destination = path.join(distPath, filePath.split(srcPath)[1]);

  // write preprocessed svelte file to /dist
  await fs.ensureFile(destination);
  await fs.writeFile(destination, code, { encoding: "utf-8" });

  // write the unprocessed svelte component to /dist/ts/ so we can have correct types for ts users
  const tsDest = path.join(distPath, "ts", relativePath);
  await fs.ensureFile(tsDest);
  await fs.writeFile(tsDest, srcCode, {
    encoding: "utf-8",
  });
}

main();
