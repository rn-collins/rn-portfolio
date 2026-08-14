import { readFile, writeFile, mkdir } from 'node:fs/promises';
import vm from 'node:vm';
import { resolve } from 'node:path';

const sourcePath=resolve('data/100-builds.js');
const outPath=resolve('packages/registry/src/registry.generated.ts');
const source=await readFile(sourcePath,'utf8');
const sandbox={window:{}};
vm.createContext(sandbox);
vm.runInContext(source,sandbox,{filename:sourcePath});
const phases=sandbox.window.RN100_PHASES;
const builds=sandbox.window.RN100_BUILDS;
if(!Array.isArray(phases)||!Array.isArray(builds)||builds.length!==100)throw new Error('Canonical registry migration input is invalid');
await mkdir(resolve('packages/registry/src'),{recursive:true});
const output=`/* GENERATED from data/100-builds.js during F0 migration.\n   Once parity is proven, this typed package becomes the runtime source of truth. */\nimport type { CanonicalBuild, CanonicalPhase } from './index';\n\nexport const phases=${JSON.stringify(phases,null,2)} as CanonicalPhase[];\n\nexport const builds=${JSON.stringify(builds,null,2)} as CanonicalBuild[];\n`;
await writeFile(outPath,output);
console.log(`generated ${builds.length} builds and ${phases.length} phases -> ${outPath}`);
