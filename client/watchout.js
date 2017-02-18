// start slingin' some d3 here.

var svgContainer = d3.select('.board').append('svg')
  .attr('width', 700)
  .attr('height', 500);

var enemyGroup = svgContainer.append('g');


var enemies = enemyGroup.selectAll('circle')
  .data([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
  .enter()
  .append('circle');

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