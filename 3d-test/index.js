const Graph = ForceGraph3D()
	(document.getElementById("3d-graph"));
Graph.resetProps();
Graph.cooldownTicks(200)
        .nodeLabel('name')
        .nodeAutoColorBy('position')
        .linkDirectionalParticles('weight')
        .forceEngine('ngraph')
        .jsonUrl('.miserables.json')
