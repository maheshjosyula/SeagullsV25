"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

interface TreeGraphProps {
  data: TreeNode | null;
}

const TreeGraph: React.FC<TreeGraphProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data) {
      console.warn("❌ No data received for TreeGraph!");
      return;
    }

    console.log("✅ Received data for TreeGraph:", data);

    const margin = { top: 50, right: 50, bottom: 50, left: 100 };
    const width = 800;
    const baseHeight = 600; // Minimum height

    const root = d3.hierarchy(data);
    const treeLayout = d3.tree<TreeNode>().size([width - margin.left - margin.right, baseHeight - margin.top - margin.bottom]);
    treeLayout(root);

    // ✅ Clear previous graph before rendering new one
    d3.select(svgRef.current).selectAll("*").remove();

    // ✅ Dynamically adjust height based on the number of nodes
    const calculatedHeight = Math.max(baseHeight, root.height * 100);
    d3.select(svgRef.current).attr("height", calculatedHeight + margin.top + margin.bottom);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const linkGenerator = d3
      .linkHorizontal<d3.HierarchyPointLink<TreeNode>, d3.HierarchyPointNode<TreeNode>>()
      .x((d) => d.y)
      .y((d) => d.x);

    svg.selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", linkGenerator)
      .attr("fill", "none")
      .attr("stroke", "#555");

    svg.selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("cx", (d) => d.y)
      .attr("cy", (d) => d.x)
      .attr("r", 6)
      .attr("fill", "blue");

    svg.selectAll(".label")
      .data(root.descendants())
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d) => d.y + 10)
      .attr("y", (d) => d.x)
      .attr("dy", "0.35em")
      .text((d) => d.data.name)
      .attr("font-size", "12px");

    console.log("✅ TreeGraph Rendered Successfully!");

  }, [data]);

  return <svg ref={svgRef} />;
};

export default TreeGraph;
