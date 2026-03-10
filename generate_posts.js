const fs = require('fs');
const path = require('path');

const posts = [];
for (let i = 1; i <= 25; i++) {
  posts.push({
    id: String(i),
    title: `테스트 게시글 ${i}`,
    content: `이것은 테스트 게시글 ${i}번의 내용입니다.`,
    author: `유저${i}`,
    createdAt: new Date(Date.now() - (26 - i) * 3600000).toISOString(),
    views: Math.floor(Math.random() * 50)
  });
}

// 최신순 정렬 (ID 큰게 위로 오거나 날짜 최신순)
posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

fs.writeFileSync(
  path.join(__dirname, 'src', 'data', 'posts.json'),
  JSON.stringify(posts, null, 2)
);
console.log('25 sample posts generated.');
