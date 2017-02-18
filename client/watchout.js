// start slingin' some d3 here.
var collisionCount = 0;
var highScore = 0;
var currentScore = 0;

var svgContainer = d3.select('.board').append('svg')
  .attr('width', 700)
  .attr('height', 500);

// var dragmove = function(d) {
//   d3.select(this)
//       .attr('x', d.x = Math.max(40, Math.min(700 - 40, d3.event.x)))
//       .attr('y', d.y = Math.max(40, Math.min(500 - 40, d3.event.y)));
// };

// var drag = d3.behavior.drag()
//     .origin(function(d) { return d; })
//     .on('drag', dragmove);
//


var follow = function(pt) {
  heroGroup.selectAll('rect')
    .attr('x', pt[0])
    .attr('y', pt[1]);
};


var enemyGroup = svgContainer.append('g');
var heroGroup = svgContainer.append('g');


var heros = heroGroup.selectAll('rect')
  .data([{ 'x': 20, 'y': 20, 'height': 10, 'width': 10, 'color': 'black' }])
  .enter()
  .append('rect');
//  .call(drag);

var enemies = enemyGroup.selectAll('circle')
    .data([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);

enemies.enter()
  .append('circle');

var followMouse = d3.select('body').select('svg')
  .on('mousemove', function() { var pt = d3.mouse(this); follow(pt); });



var heroAttributes = heros
  .attr('x', function (d) { return d.x; })
  .attr('y', function (d) { return d.y; })
  .attr('height', function (d) { return d.height; })
  .attr('width', function (d) { return d.width; })
  .style('fill', function (d) { return d.color; });

var enemyAttributes = enemies
  .attr('cx', function() { return Math.floor(Math.random() * 650); })
  .attr('cy', function() { return Math.floor(Math.random() * 450); })
  .attr('r', 20)
  .attr('fill', function (d) { return 'red'; });


// var move = function() {
//   var enemies = enemyGroup.selectAll('circle')
//     .data([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);

//   enemies.enter()
//     .append('circle');

//   var enemyAttributes = enemies
//   .transition()
//   .duration(1000)
//   .attr('cx', function() { return Math.floor(Math.random() * 650); })
//   .attr('cy', function() { return Math.floor(Math.random() * 450); })
//   .attr('r', 20)
//   .attr('fill', function (d) { return 'red'; })
//   .tween('collision', collisionDetection)
//   .each('end', move);
// };

// move();

  // return function(){
  //   var enemyX = Math.floor(enemies.attr('cx'));
  //   var enemyY = Math.floor(enemies.attr('cy'));
  //   var heroX = Math.floor(heros.attr('x'));
  //   var heroY = Math.floor(heros.attr('y'));
  //   if(Math.abs(enemyX - heroX) < 20 && Math.abs(enemyY - heroY) < 20){
  //     collisionCount++;
  //     d3.select('#collisionCount').html(collisionCount);
  //   }
  // }

var update = function() {
  d3.transition()
    .duration(1000)
    .ease('linear')
    .each(function() {
      enemyGroup.selectAll('circle').transition()
        .attr('cx', function() { return Math.random() * 650; })
        .attr('cy', function() { return Math.random() * 450; });
        //.tween('collision', collisionDetection);
    });
};

//replace with d3 time interval function b/c d3 keeps track of time internally
setInterval(function() {
  update();
}, 1000);

var colliding = false;
var collisionDetection = function() {
  var radius = 20;
  var collision = false;
  var hero = heros;

  enemies.each(function() {
    var cx = parseInt(this.cx.animVal.value) + radius;
    var cy = parseInt(this.cy.animVal.value) + radius;
    var x = parseInt(hero[0][0].x.animVal.value) + radius;
    var y = parseInt(hero[0][0].y.animVal.value) + radius;
    var xAxis = cx - x;
    var yAxis = cy - y;
    var distance = Math.sqrt(xAxis * xAxis + yAxis * yAxis);

    if (distance < radius * 2) {
      collision = true;
      currentScore = 0;
      console.log('collision true');
    }
  });

  if (collision) {
    currentScore = 0;
    if (collision !== colliding) {
      collisionCount++;
      d3.select('#collisionCount').html(collisionCount);
    }
  }

  colliding = collision;
};


d3.timer(collisionDetection);
//getattribute will give x and y
