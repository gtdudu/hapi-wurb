module.exports = [{
  method: 'GET',
  path: '/api',
  handler: function(request, reply) {
    reply('Hello, world!');
  }
},
{
  method: 'GET',
  path: '/apihello',
  handler: function(request, reply) {
    reply('Hello, fzeafeza!');
  }
},
{
  method: 'GET',
  path: '/apiello',
  handler: function(request, reply) {
    reply('Hello toi !');
  }
}];
