const CDP = require('chrome-remote-interface');

const options = {
  port: 9222 // Replace with your port number
};

CDP(options, async function(client) {
  const {Target} = client;
  
  const targets = await Target.getTargets();

  console.log('Available targets:');
  targets.forEach(target => {
    console.log(`- ${target.title} (${target.url}): ${target.targetId}`);
  });

  // ... continue with the rest of your code ...
});
