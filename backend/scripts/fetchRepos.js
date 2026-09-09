import https from 'https';

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
      console.log('Total repos:', repos.length);
      repos.forEach((r, i) => {
        console.log(`${i+1}. [${r.name}] (${r.language || 'Code'}) - Stars: ${r.stargazers_count}, Forks: ${r.forks_count}`);
        console.log(`   URL: ${r.html_url}`);
        console.log(`   Live: ${r.homepage || 'N/A'}`);
        console.log(`   Desc: ${r.description || 'No description'}`);
        console.log(`   Topics: ${r.topics?.join(', ') || 'none'}`);
        console.log('---');
      });
    } catch (e) {
      console.error(e.message, data);
    }
  });
}).on('error', (e) => console.error(e));
