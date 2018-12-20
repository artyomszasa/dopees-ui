import * as fspath from 'path';
import chain from 'dopees-chain';
import polymerModule from 'dopees-chain-polymer';

const { PolymerProject } = polymerModule;

const proj = new PolymerProject({
  sourceRoot: './src',
  targetRoot: './lib',
  application: false
});

const runner = chain.Runner.from([proj.createExecutor()]);

async function run() {
  // try { await runner.watch(proj.taskName, null, './src'); }
  try {
    await runner.execute(proj.taskName);
    // const deps = await runner.storage.getObject('dopees.polymer.dependencies');
  }
  catch (e) { console.error(e); }
}

run();
