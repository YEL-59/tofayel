import fs from 'fs';

const repos = JSON.parse(fs.readFileSync('backend/scripts/yel59_repos.json', 'utf8'));
const own = repos.filter(r => !r.fork);
console.log('Total non-fork repos:', own.length);

own.forEach((r, i) => {
  console.log(`${i+1}. [${r.name}]`);
  console.log(`   Lang: ${r.language || 'Full-Stack'}, Stars: ${r.stargazers_count}, Forks: ${r.forks_count}`);
  console.log(`   Live: ${r.homepage || 'N/A'}`);
  console.log(`   Repo: ${r.html_url}`);
  console.log(`   Desc: ${r.description || 'N/A'}`);
  console.log(`   Topics: ${r.topics?.join(', ') || 'none'}`);
  console.log('---');
});
