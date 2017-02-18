// start slingin' some d3 here.

var svgContainer = d3.select('.board').append('svg')
  .attr('width', 700)
  .attr('height', 500);

var dragmove = function(d) {
  d3.select(this)
      .attr('x', d.x = Math.max(40, Math.min(700 - 40, d3.event.x)))
      .attr('y', d.y = Math.max(40, Math.min(500 - 40, d3.event.y)));
};

var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on('drag', dragmove);



var enemyGroup = svgContainer.append('g');
var heroGroup = svgContainer.append('g');


var enemies = enemyGroup.selectAll('circle')
  .data([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
  .enter()
  .append('circle');


var heros = heroGroup.selectAll('rect')
  .data([{ 'x': 20, 'y': 20, 'height': 25, 'width': 25, 'color': 'black' }])
  .enter()
  .append('rect')
  .call(drag);

var heroAttributes = heros
  .attr('x', function (d) { return d.x; })
  .attr('y', function (d) { return d.y; })
  .attr('height', function (d) { return d.height; })
  .attr('width', function (d) { return d.width; })
  .style('fill', function (d) { return d.color; });




var enemyAttributes = enemies
  .attr('cx', function() { return Math.random() * 650; })
  .attr('cy', function() { return Math.random() * 450; })
  .attr('r', function (d) { return 20; })
  .style('fill', function (d) { return 'red'; });


var update = function() {
  d3.transition()
    .duration(1000)
    .ease('linear')
    .each(function() {
      enemyGroup.selectAll('circle').transition()
        .attr('cx', function() { return Math.random() * 650; })
        .attr('cy', function() { return Math.random() * 450; });
    });
};

setInterval(function() {
  update();
}, 1000);

