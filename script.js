const svgWidth = 1200;
const svgHeight = 600;
const margin = {top: 40, right: 40, bottom: 60, left: 80}; // Increase the left margin


const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

let rewards = 720000;

function computeReward(day) {
    if (day % 180 === 0 && day !== 0) {
        rewards *= 0.75;
    }
    return rewards;
}

const days = Array.from({length: 3652}, (_, i) => i);
const dailyRewards = days.map(computeReward);

// Convert day number to actual date
function computeDate(dayNum) {
    const start = new Date(2022, 3, 8);  // Month is 0-indexed, so 3 = April
    return new Date(start.getTime() + dayNum * 24 * 60 * 60 * 1000);
}

const x = d3.scaleUtc()
    .domain([computeDate(0), computeDate(3652)])
    .range([0, width]);

const y = d3.scaleLinear()
    .domain([0, d3.max(dailyRewards)])
    .range([height, 0]);

const line = d3.line()
    .x((_, i) => x(computeDate(i)))
    .y(d => y(d));

const area = d3.area()
    .x((_, i) => x(computeDate(i)))
    .y0(height)
    .y1(d => y(d));


const svg = d3.select("#chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const xAxis = d3.axisBottom(x)
    .ticks(d3.utcMonth.every(3))  // Show a tick every month
    .tickFormat(d => {
        if (d.getUTCMonth() === 0) return d3.utcFormat("%Y")(d);  // Display year if January
        else return "";  // Otherwise, don't display anything
    });

svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "black");


svg.append("path")
    .data([dailyRewards])
    .attr("class", "line")
    .attr("d", area)
    .style("fill", "#CDFA50");

/*
// Draw the X-axis
svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).ticks(d3.utcMonth.every(6)).tickFormat(d3.utcFormat("%b %Y")));
*/

svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis)
    .selectAll("text")
    .attr("font-family", "Montserrat");

// Draw the Y-axis
svg.append("g")
    .call(d3.axisLeft(y));

svg.append("text")
    .attr("class", "title-text")
    .attr("x", width)  // This ensures the text aligns to the right side of the SVG
    .attr("y", 0)  // Top of the SVG
    .attr("dy", "48px")  
    .attr("text-anchor", "end")  // Ensures the text is right-aligned
    .attr("font-size", "48px")
    .attr("font-weight", "900")
    .attr("line-height", "64px")
    .attr("font-family", "Montserrat")
    .attr("fill", "FFF")  // Change this to your desired color
    .text("$PHA Halving Schedule");

svg.append("text")
    .attr("class", "subtitle-text")
    .attr("x", width)  // Right-aligned
    .attr("y", 70)  // This value is approximated (48px font-size + a bit of padding for clarity)
    .attr("text-anchor", "end")  // Right-aligned
    .attr("font-size", "16px")
    .attr("font-weight", "500")
    .attr("line-height", "24px")
    .attr("letter-spacing", "-0.176px")
    .attr("font-family", "Montserrat")
    .attr("fill", "#A4C840")  // Change this to your desired color
    .text("Gemeni Tokenomic for Compute Reward include Phala & Khala");



svg.selectAll("text").style("font-family", "Montserrat");

// Tooltip
const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("background-color", "#7F52FA")
    .style("color", "#F2EDFE")
    .style("padding", "8px")
    .style("border-radius", "4px")
    .style("pointer-events", "none");


svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all")
    .on("mouseover", () => tooltip.style("opacity", .9))
    .on("mouseout", () => tooltip.style("opacity", 0))
    .on("mousemove", mousemove);

function computeTotalRewardUpToDay(dayNum) {
        return dailyRewards.slice(0, dayNum + 1).reduce((acc, val) => acc + val, 0);
    }

function mousemove(event) {
    const bisect = d3.bisector(d => computeDate(d)).left;
    const xPos = d3.pointer(event, this)[0];
    const x0 = bisect(days, x.invert(xPos));
    const y0 = dailyRewards[x0];
    const totalReward = computeTotalRewardUpToDay(x0);

    tooltip.html(`Date: ${computeDate(x0).toLocaleDateString()}<br>Daily Mint: ${y0.toLocaleString()} PHA<br>Total Mint: ${totalReward.toLocaleString()} PHA`)
    .style("left", (event.pageX + 15) + "px")
    .style("top", (event.pageY - 28) + "px");
}

