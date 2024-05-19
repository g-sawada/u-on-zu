import { useState, useEffect } from 'react';

export const useGraph = () => {
  const [graph, setGraph] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGraph() {
      try {
        const response = await fetch('/api/graphs/1');
        if (response.ok) {
          const graph = await response.json();
          setGraph(graph);
          setLoading(false);
        } else {
          console.log('server error!');
        }
      } catch (error) {
          console.log('failed to fetch', error);
      }
    }

    fetchGraph();
  }, [])

  return { graph, setGraph, loading }
}
