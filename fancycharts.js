

/// --------------
/// Simple Charts Library based on d3.js to create some simple graphs based on a percentage number
/// by @ahoiin, Sebastian Sadowski
/// --------------

	// define class
	function Fancychart(width, height, colors, color_deactivated){

	  // Define Variables
		this.outerWidth = width || 200;
		this.outerHeight = height || 120;
		this.colors = colors || ["#00ACE4", "#00D8A5", "#9b59b6", "#F1B719", "#e74c3c" ];
		this.color_deactivated = color_deactivated || '#e5e5e5';
		this.color_current = Math.random() * colors.length;

		this.duration = 700;
	}




	// horizontal bar, like a progress bar
	Fancychart.prototype.circles = function(el,val,color){

		var that = this;
		var data = [ val, 100-parseInt(val) ],
			margin = {top: 14, right: 10, bottom: 20, left: 10},
			innerWidth = that.outerWidth - margin.left - margin.right,
	    	innerHeight = that.outerHeight - margin.top - margin.bottom,
	    	color = color || that.colors[Math.round(Math.random() * that.colors.length)],
	    	paddingEl = 14,
	    	elementsInRow = 13,
	    	radius = 4,
	    	row = 1,
	    	dataset = [];

		data.forEach(function(d, i) {
			while(d--) {
				var c = (i==0) ? color : that.color_deactivated;
				dataset.push({color:c});
			}
		});

		var svg = d3.select(el).append("svg")
				.attr("width", that.outerWidth)
				.attr("height", that.outerHeight )
			.append("g")
				.attr("transform", "translate(" + (margin.left ) + "," + (margin.top ) + ")");

		var circle = svg.selectAll("circle")
	    	.data(dataset)
	    .enter().append("circle")
		    .style("fill", function(d,i) { return d.color; })
		    .attr("r", 0)
		    .style("opacity", 0)
		    .attr("cx", function(d,i) { row = (i%elementsInRow == 0) ? i/elementsInRow : row; return ((i+1)-row*elementsInRow) * paddingEl;})
		    .attr("cy", function(d,i) { row = (i%elementsInRow == 0) ? i/elementsInRow : row; return row * paddingEl;})

		 // simple animation on load: opaciy
		 circle.transition()
		 	.duration(that.duration)
		 	.delay(function(d,i) { return 15 * i; })
		 		.style("opacity", 1)
		 		.attr("r", radius);


	};




	// horizontal bar, like a progress bar
	Fancychart.prototype.barHorizontal = function(el,val,color){

		var that = this;
		var data = [ 100, parseInt(val)  ],
			margin = {top: 20, right: 0, bottom: 0, left: 10},
			innerWidth = that.outerWidth - margin.left - margin.right,
	    	innerHeight = that.outerHeight - margin.top - margin.bottom,
	    	color = color || that.colors[Math.round(Math.random() * that.colors.length)];
	    	marginInnerEl = 12;

		var x = d3.scale.linear()
		    .range([0, innerWidth])
		  	.domain([0, d3.max(data, function(d) { return d; })]);

		var svg = d3.select(el).append("svg")
			.attr("width", that.outerWidth)
			.attr("height", that.outerHeight )
		.append("g")
			.attr("transform", "translate(" + (margin.left) + "," + ( innerHeight - 5) + ") rotate(0)");

	  	var g = svg.selectAll(".bar")
	    	.data(data)
	    .enter().append("g")
	    	.style("opacity", 0)
	    	.attr("transform", function(d,i) { marginEl=(i==1)?marginInnerEl/4:0; return "translate(" + marginEl + "," + marginEl + ")"; })


	    var rect = g.append("rect")
			.style("fill", function(d,i) { var c = (i==1) ? color : that.color_deactivated;  return c; })
			.attr("width", 0)
			.attr("height", function(d,i) { marginEl=(i==1)?marginInnerEl:0; return  innerHeight/4-  marginEl/2;  })
			.attr("rx", marginInnerEl)// set the x corner curve radius
			.attr("ry", marginInnerEl);

		 // simple animation on load: opaciy
		 g.transition()
		 	.duration(that.duration)
		 	.delay(function(d,i) { return 200 * i; })
		 		.style("opacity", 1)

		 // simple animation on load: movement
		 rect.transition()
		 	.duration(that.duration)
		 	.ease("quad")
		 	.delay(function(d,i) { return 200 * i; })
		 		.attr("width", function(d,i) { marginEl=(i==1)?marginInnerEl:0; return  x(d) -  marginEl;  })


	};




	// vertical bar chart with the option to rotate it 45degree
	Fancychart.prototype.barVertical = function(el,val,color,rotate){

		var that = this;
		var data = [ 100, parseInt(val) ],
			margin = (rotate) ? {top: 20, right: 70, bottom: 20, left: 5} : {top: 20, right: 50, bottom: 1, left: 10},
			innerWidth = that.outerWidth - margin.left - margin.right,
	    	innerHeight = that.outerHeight - margin.top - margin.bottom,
	    	rotate = rotate || false,
	    	color = color || that.colors[Math.round(Math.random() * that.colors.length)];
	    	marginInnerEl = 5;

		var y = d3.scale.linear()
		    .range([innerHeight, 0])
		  	.domain([0, d3.max(data, function(d) { return d; })]);

		var svg = d3.select(el).append("svg")
			.attr("width", that.outerWidth)
			.attr("height", that.outerHeight )
		.append("g")
			.attr("transform", function(d) { var t = rotate ? "translate(" + (margin.left + innerWidth / 2)+ "," + ( 0 ) + ") rotate(45)" : "translate(" + (margin.left + innerWidth / 2 - innerHeight/2) + "," + (margin.top - 10 ) + ")"; return t; });

		var g = svg.selectAll(".bar")
			.data(data)
		.enter().append("g")
			.style("opacity", 0)
			.attr("transform", function(d,i) { marginEl=(i==1)?marginInnerEl:0; return "translate(" + marginEl + "," + marginEl + ")"; })

		var rect = g.append("rect")
			.style("fill", function(d,i) { var c = (i==1) ? color : that.color_deactivated;  return c; })
			.attr("width", function(d,i) { marginEl=(i==1)?marginInnerEl:0; return  innerHeight -  marginEl*2; })
			.attr("y", function(d) { return innerHeight + marginInnerEl/2; })
			.attr("height", function(d,i) { return 0 ; }) ///
			.attr("rx", marginInnerEl) // set the x corner curve radius
			.attr("ry", marginInnerEl);


		 // simple animation on load: opaciy
		 g.transition()
		 	.duration(that.duration)
		 	.delay(function(d,i) { return 200 * i; })
		 		.style("opacity", 1)

		 // simple animation on load: movement
		 rect.transition()
		 	.duration(that.duration)
		 	.ease("quad")
		 	.delay(function(d,i) { return 200 * i; })
		 		.attr("y", function(d) { return y(d); })
		 		.attr("height", function(d,i) { marginEl=(i==0)?marginInnerEl*2:0; return innerHeight - y(d) + marginEl; })

	};




	// donut chart
	Fancychart.prototype.donut = function(el,val,color){

		var that = this;
		var margin = {top: 25, right: 50, bottom: 1, left: 5},
			innerWidth = that.outerWidth - margin.left - margin.right,
	    	innerHeight = that.outerHeight - margin.top - margin.bottom;
			radius = Math.min(innerWidth, innerHeight) / 2,
		  	data = [val,100-val],
		  	color = color || that.colors[Math.round(Math.random() * that.colors.length)];

		var arc = d3.svg.arc()
		    .outerRadius(radius )
		    .innerRadius(radius - 10);

		var pie = d3.layout.pie()
		    .sort(null)
		    .value(function(d) { return d; });

		var svg = d3.select(el).append("svg")
		    .attr("width", that.outerWidth)
		    .attr("height", that.outerHeight)
		.append("g")
		    .attr("transform", "translate(" + (margin.left + innerWidth / 2) + "," + (margin.top + innerHeight / 2) + ")");

		var g = svg.selectAll(".arc")
			.data(pie(data))
		.enter().append("g")
			.style("opacity", 0);

		var path = g.append("path")
		  .attr("d", arc)
		  .style("stroke-width", "3px")
		  .style("stroke", "#fff")
		  .style("fill", function(d,i) { var c = (i==0) ? color : that.color_deactivated;  return c; });


		// simple animation on load: opacity
		g.transition()
		 	.duration(that.duration)
		 	.ease("quad")
		 	.delay(function(d,i) { return 200 * i; })
		 		.style("opacity", 1);


		path.transition()
			.duration(that.duration)
			.ease("quad")
			.attrTween("d", arcTween);

		function arcTween(finish) {
		    var start = {
		        startAngle: 0,
		        endAngle: 0
		    };
		    var i = d3.interpolate(start, finish);
		    return function(d) { return arc(i(d)); };
		}


	};




