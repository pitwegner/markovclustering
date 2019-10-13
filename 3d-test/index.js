let clusterMaterial = {color: 0x00ff00, transparent: true, opacity: 0.4}
let data = clustered_data

const Graph = ForceGraph3D()
	(document.getElementById("3d-graph"));
Graph.resetProps();
Graph.cooldownTicks(200)
  .nodeLabel('name')
  .nodeAutoColorBy('position')
  .linkWidth(1)
  .linkMaterial((link) => {
    if (data.clusters.filter((cluster) => {
      return cluster.length === 2 && cluster[0] === link.source && cluster[1] === link.target
    }).length > 0) return new THREE.MeshLambertMaterial(clusterMaterial)

  })
  .linkDirectionalParticleWidth(2)
  .linkDirectionalParticles('weight')
  .forceEngine('ngraph')
  .graphData(data)
  .onEngineStop(() => {
    data.clusters.map((cluster) => {
      const scene = Graph.scene()
      const node_positions = scene.children
        .find((c) => c.type == "Group").children
        .filter((c) => c.__graphObjType == "node")
        .filter((c) => cluster.includes(c.__data.id))
        .map((n) => n.position)

      let material = {...clusterMaterial}
      let geometry
      if (node_positions.length > 3) {
        geometry = new THREE.ConvexGeometry(node_positions)
      } else if(node_positions.length === 3) {
        geometry = new THREE.Geometry();
        geometry.vertices.push(...node_positions)
        geometry.faces.push(new THREE.Face3(0, 1, 2))
        material.side = THREE.DoubleSide
      } else if(node_positions.length === 2) {
        // handled above in linkMaterial()
      } else {
        // Dunno..? -> Doesn't occur
      }
      const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial(material))
      scene.add(mesh)
    })
  })
