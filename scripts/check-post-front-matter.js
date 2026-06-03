const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '..', 'source', '_posts');
const requiredFields = ['title', 'date'];
const forbiddenPatterns = [
  {
    pattern: /本文由\s*AI\s*自动生成/i,
    message: 'remove AI generated note'
  }
];
const files = fs.readdirSync(postsDir).filter((file) => file.endsWith('.md'));
const invalid = [];

for (const file of files) {
  const filePath = path.join(postsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  if (!content.startsWith('---\n')) {
    invalid.push(`${file}: missing front matter`);
    continue;
  }

  const endIndex = content.indexOf('\n---', 4);
  if (endIndex === -1) {
    invalid.push(`${file}: front matter is not closed`);
    continue;
  }

  const frontMatter = content.slice(4, endIndex);
  for (const field of requiredFields) {
    const pattern = new RegExp(`^${field}:\\s*\\S+`, 'm');
    if (!pattern.test(frontMatter)) {
      invalid.push(`${file}: missing ${field}`);
    }
  }

  for (const { pattern, message } of forbiddenPatterns) {
    if (pattern.test(content)) {
      invalid.push(`${file}: ${message}`);
    }
  }
}

if (invalid.length > 0) {
  console.error('Invalid post front matter:');
  for (const item of invalid) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log(`Checked ${files.length} posts: front matter OK.`);
