import PAGES from '../fixtures/pages'

module.exports = [
  {
    method: 'GET',
    path: '/api/pages',
    handler(request, reply) {
      reply(PAGES);
    }
  },
  {
    method: 'GET',
    path: '/api/edit/page',
    handler(request, reply) {
      reply('Hello, fzeafeza!');
    }
  },
  {
    method: 'GET',
    path: '/api/page',
    handler(request, reply) {
      reply(PAGES[Math.floor(Math.random() * PAGES.length)]);
    }
  }
];
