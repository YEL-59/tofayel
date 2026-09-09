import fs from 'fs';

const repos = JSON.parse(fs.readFileSync('backend/scripts/yel59_repos.json', 'utf8'));
const own = repos.filter(r => !r.fork);

// Filter out practice or empty utility dirs, prioritize projects with live link, description, or clear purpose
console.log('Repos with homepage:');
const withHomepage = own.filter(r => r.homepage && r.homepage.trim() !== '' && r.homepage.startsWith('http'));
withHomepage.forEach((r, i) => {
  console.log(`${i+1}. ${r.name} -> Live: ${r.homepage} | Repo: ${r.html_url}`);
});
