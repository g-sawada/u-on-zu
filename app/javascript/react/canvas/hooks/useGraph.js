import { useState, useEffect } from 'react';

export const useGraph = () => {
  const [graph, setGraph] = useState(null);

  useEffect(() => {
    async function fetchGraph() {
      try {
        const response = await fetch('ここにエンドポイント');
        if (response.ok) {
          const graph = await response.json();
          setGraph(graph);
        } else {
          console.log('server error!');
        }
      } catch (error) {
          console.log('failed to fetch', error);
      }
    }

    fetchGraph();
  }, [])

  return { graph, setGraph }
}
