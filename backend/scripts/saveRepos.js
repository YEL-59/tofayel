import https from 'https';
import fs from 'fs';

const options = {
  hostname: 'api.github.com',
  path: '/users/YEL-59/repos?per_page=100&sort=updated',
  headers: { 'User-Agent': 'NodeJS' }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const repos = JSON.parse(data);
      console.log('Fetched repos count:', repos.length);
      fs.writeFileSync('backend/scripts/yel59_repos.json', JSON.stringify(repos, null, 2));
      console.log('Saved to backend/scripts/yel59_repos.json');
    } catch (e) {
      console.error(e);
    }
  });
}).on('error', (e) => console.error(e));
