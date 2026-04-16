import https from 'https';

const urls = [
  "https://maps.app.goo.gl/24TAkmgwSQP9Jvfu9", // chaliyam
  "https://maps.app.goo.gl/6kvvJfPXKBx92Q4Q7", // chaliyam angadi area
  "https://maps.app.goo.gl/RoSkgXmfBXLbqUku5", // chaliyam beach area
  "https://maps.app.goo.gl/y4YbCYaVeNWMq9Jf7", // feroke
  "https://maps.app.goo.gl/3TkVEMFCo3vzPeM16", // cheruvannur
  "https://maps.app.goo.gl/p15ETCFQsoTie4gk6", // mannoor valavu
  "https://maps.app.goo.gl/WSLKqKEaDpnBhopS8", // kadukka bazaar
  "https://maps.app.goo.gl/VWom1S7yjpovp4FV6", // petta
  "https://maps.app.goo.gl/g724BpVHVoSDgyd69", // nallur
  "https://maps.app.goo.gl/s7QwKjLn2JCdhtVc8", // puttekadu
  "https://maps.app.goo.gl/fzK8bCNV9Pf1vJr18", // kallambara
  "https://maps.app.goo.gl/N6oTDTU2KPaNsxsW6"  // beypore
];

async function resolveUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve(res.headers.location);
      } else {
        resolve(url);
      }
    });
  });
}

async function main() {
  for (const url of urls) {
    const resolved = await resolveUrl(url);
    console.log(resolved);
  }
}

main();
