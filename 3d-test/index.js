const Graph = ForceGraph3D()
	(document.getElementById("3d-graph"));
Graph.resetProps();
Graph.cooldownTicks(200)
  .nodeLabel('name')
  .nodeAutoColorBy('position')
  .linkDirectionalParticles('weight')
  .forceEngine('ngraph')
  .graphData(data)
  .onEngineStop(() => {
    const node_positions = Graph.scene().children.find((c) => c.type == "Group").children.filter((c) => c.__graphObjType == "node").map((n) => n.position)
    const scene = Graph.scene()
    var geometry = new THREE.ConvexGeometry(node_positions);
    var material = new THREE.MeshLambertMaterial({color: 0x00ff00, transparent: true, opacity: 0.4});
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  })
