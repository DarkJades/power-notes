import { execFileSync } from 'node:child_process';

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const args = Object.fromEntries(process.argv.slice(2).map((arg) => {
  const [key, ...value] = arg.replace(/^--/, '').split('=');
  return [key, value.join('=')];
}));
const message = args.message || args.m;

function run(command, commandArgs, options = {}) {
  return execFileSync(command, commandArgs, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...options });
}

function runVisible(command, commandArgs) {
  execFileSync(command, commandArgs, { stdio: 'inherit' });
}

if (!message) {
  console.error('用法：npm run site:publish -- --message="新增文章：开关电源小信号建模"');
  process.exit(1);
}

const branch = run('git', ['branch', '--show-current']).trim();
if (branch !== 'main') {
  console.error(`当前分支为“${branch || 'detached HEAD'}”，为避免误发布，只允许从 main 分支发布。`);
  process.exit(1);
}

console.log('1/4 同步检查远端 main 状态…');
runVisible('git', ['fetch', 'origin', 'main']);
try {
  run('git', ['merge-base', '--is-ancestor', 'origin/main', 'HEAD']);
} catch {
  console.error('本地 main 未包含远端最新提交。请先执行：git pull --rebase origin main');
  process.exit(1);
}

console.log('2/4 执行文章、类型与构建检查…');
runVisible(npm, ['run', 'check:all']);

const changes = run('git', ['status', '--porcelain']).trim();
if (!changes) {
  console.error('没有检测到需要发布的文件。');
  process.exit(1);
}

console.log('3/4 提交本次变更…');
runVisible('git', ['add', '--all']);
runVisible('git', ['commit', '-m', message]);

console.log('4/4 推送到 main，GitHub Actions 将自动发布…');
runVisible('git', ['push', 'origin', 'main']);
console.log('发布提交已推送。请在 GitHub Actions 中等待“Deploy to GitHub Pages”完成。');
