// start slingin' some d3 here.

var svgContainer = d3.select(".board").append("svg")
  .attr("width",500)
  .attr("height",500);

var enemyGroup = svgContainer.append("g");

var enemies = enemyGroup.selectAll("circle")
  .data([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
  .enter()
  .append("circle");

var enemyAttributes = enemies
  .attr("cx", function (d, i) { return 40; })
  .attr("cy", function (d, i) { return i * 30 + 20; })
  .attr("r", function (d) { return 20; })
  .style("fill", function (d) { return "red"; });


