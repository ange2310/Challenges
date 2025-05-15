import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const Grafo = () => {
  const [personas, setPersonas] = useState([
    { name: 'Samuel', age: 21, city: 'Madrid' },
    { name: 'Angee', age: 20, city: 'Barcelona' },
    { name: 'Mel', age: 20, city: 'Madrid' },
    { name: 'sebas', age: 21, city: 'Valencia' },
    { name: 'Luis', age: 35, city: 'Barcelona' }
  ]);

  const [ciudades, setCiudades] = useState([
    { name: 'Madrid' },
    { name: 'Barcelona' },
    { name: 'Valencia' }
  ]);

  const [nuevaPersona, setNuevaPersona] = useState({ 
    name: '', age: '', city: '' 
  });
  
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState('');

  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const width = 800;
    const height = 400;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("border", "1px solid #eee")
      .style("background-color", "#fafafa");

    const nodes = [
      ...personas.map(p => ({ 
        id: p.name, 
        label: `${p.name} (${p.age})`,
        type: 'person',
        city: p.city
      })),
      ...ciudades.map(c => ({ 
        id: c.name, 
        label: c.name,
        type: 'city'
      }))
    ];
    
    const links = personas.map(p => ({
      source: p.name,
      target: p.city,
      value: 1
    }));

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(width / 2).strength(0.1))
      .force("y", d3.forceY(height / 2).strength(0.1));

    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .style("stroke", "#999")
      .style("stroke-width", 2);

    const node = svg.append("g")
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node");

    node.each(function(d) {
      if (d.type === 'person') {
        d3.select(this).append("circle")
          .attr("r", 20)
          .style("fill", "#5CA0CA");
      } else {
        d3.select(this).append("rect")
          .attr("width", 30)
          .attr("height", 30)
          .attr("x", -15)
          .attr("y", -15)
          .style("fill", "#F7A278");
      }
    });

    node.append("text")
      .attr("dx", d => d.type === 'person' ? 25 : 0)
      .attr("dy", d => d.type === 'person' ? 5 : -20)
      .attr("text-anchor", d => d.type === 'person' ? "start" : "middle")
      .text(d => d.label)
      .style("font-size", "12px")
      .style("fill", "#333");

    function ticked() {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("transform", d => `translate(${d.x}, ${d.y})`);
    }

    simulation.on("tick", ticked);
    
    simulation.alpha(1).restart();
    
    setTimeout(() => {
      simulation.stop();
      nodes.forEach(node => {
        node.fx = node.x;
        node.fy = node.y;
      });
      ticked();
    }, 2000);

    return () => {
      if (simulation) simulation.stop();
    };
  }, [personas, ciudades]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaPersona({
      ...nuevaPersona,
      [name]: value
    });
  };

  const agregarPersona = () => {
    if (nuevaPersona.name && nuevaPersona.age && nuevaPersona.city) {
      if (personas.some(p => p.name === nuevaPersona.name)) {
        alert('Ya existe una persona con ese nombre. Usa un nombre diferente.');
        return;
      }
      
      setPersonas([...personas, nuevaPersona]);
      setNuevaPersona({ name: '', age: '', city: '' });
    } else {
      alert('Por favor completa todos los campos');
    }
  };

  const personasEnCiudad = ciudadSeleccionada 
    ? personas.filter(p => p.city === ciudadSeleccionada)
    : [];

  return (
    <div className="grafo-container">
      <div className="form-container" style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h2>Agregar Nueva Persona</h2>
        <div className="form-inputs" style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={nuevaPersona.name}
            onChange={handleInputChange}
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            type="number"
            name="age"
            placeholder="Edad"
            value={nuevaPersona.age}
            onChange={handleInputChange}
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <select
            name="city"
            value={nuevaPersona.city}
            onChange={handleInputChange}
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="">Seleccionar Ciudad</option>
            {ciudades.map(ciudad => (
              <option key={ciudad.name} value={ciudad.name}>
                {ciudad.name}
              </option>
            ))}
          </select>
          <button 
            onClick={agregarPersona}
            style={{ padding: '8px 16px', backgroundColor: '#4285f4', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Agregar
          </button>
        </div>
      </div>
      <div className="city-list" style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h2>Personas por Ciudad</h2>
        <select
          value={ciudadSeleccionada}
          onChange={(e) => setCiudadSeleccionada(e.target.value)}
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '10px' }}
        >
          <option value="">Seleccionar Ciudad</option>
          {ciudades.map(ciudad => (
            <option key={ciudad.name} value={ciudad.name}>
              {ciudad.name}
            </option>
          ))}
        </select>
        
        {ciudadSeleccionada && (
          <div>
            <h3>
              Personas que viven en {ciudadSeleccionada}:
            </h3>
            {personasEnCiudad.length > 0 ? (
              <ul style={{ paddingLeft: '20px' }}>
                {personasEnCiudad.map(persona => (
                  <li key={persona.name}>
                    {persona.name} - {persona.age} años
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay personas registradas en esta ciudad.</p>
            )}
          </div>
        )}
      </div>

      <div className="graph-container" style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h2>Visualización del Grafo</h2>
        <div className="graph" style={{ width: '100%', height: '450px', border: '1px solid #eee' }}>
          <svg 
            ref={svgRef} 
            style={{ width: '100%', height: '100%' }}
          ></svg>
        </div>
      </div>

      <div className="legend" style={{ display: 'flex', gap: '20px' }}>
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#5CA0CA', marginRight: '8px', borderRadius: '50%' }}></div>
          <span>Personas</span>
        </div>
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#F7A278', marginRight: '8px' }}></div>
          <span>Ciudades</span>
        </div>
      </div>
    </div>
  );
};

export default Grafo;