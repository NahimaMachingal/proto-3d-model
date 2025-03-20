// pages/index.js
import { useEffect, useState } from "react";
import Head from "next/head";
import ModelViewer from "../components/ModelViewer";

export default function Home() {
    const [data, setData] = useState({
      pythonModelInfo: null,
      nextModelInfo: null,
      error: null,
      loading: true,
    });

    useEffect(() => {
        const fetchData = async () => {
          try {
            const [pythonRes, nextRes] = await Promise.all([
              fetch("http://localhost:8000/python-model-info"),
              fetch("/api/nextjs-model-info"),
            ]);
    
            if (!pythonRes.ok || !nextRes.ok) {
              throw new Error("Failed to fetch data from one or more backends.");
            }
    
            const [pythonData, nextData] = await Promise.all([
              pythonRes.json(),
              nextRes.json(),
            ]);
    
            setData({
              pythonModelInfo: pythonData,
              nextModelInfo: nextData,
              error: null,
              loading: false,
            });
          } catch (error) {
            setData((prev) => ({ ...prev, error: error.message, loading: false }));
          }
        };
    
        fetchData();
      }, []);
      const { pythonModelInfo, nextModelInfo, error, loading } = data;

  return (
    <div className="container">
      <Head>
        <title>3D Model Viewer</title>
        <meta
          name="description"
          content="3D Model Viewer with integrated backends"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2>3D Model Viewer</h2>
        <div className="viewer-container">
            
          <ModelViewer />
        </div>

        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="info-container">
            {pythonModelInfo && (
              <div className="info-panel">
                <h3>Python Backend Info</h3>
                <p><strong>Model Name:</strong> {pythonModelInfo.model_name}</p>
                <p><strong>Vertex Count:</strong> {pythonModelInfo.vertex_count}</p>
                <p><strong>Texture Details:</strong> {pythonModelInfo.texture_details}</p>
              </div>
            )}

            {nextModelInfo && (
              <div className="info-panel">
                <h3>Next.js Backend Info</h3>
                <p><strong>Model Scale:</strong> {nextModelInfo.scale}</p>
                <p><strong>Face Count:</strong> {nextModelInfo.face_count}</p>
                <p><strong>Created By:</strong> {nextModelInfo.created_by}</p>
              </div>
            )}
          </div>
        )}
      </main>

      

      <style jsx>{`
.container {
    min-height: 100vh;
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

main {
    width: 100%;
    max-width: 1200px;
    padding: 2rem 0;
    display: flex;
    flex-direction: column; /* Stack elements vertically */
    align-items: center;
    gap: 20px;
}

.title {
    margin: 0 0 2rem;
    line-height: 1.15;
    font-size: 2.5rem;
    text-align: center;
    color: #0070f3;
}

    .viewer-container {
  width: 100%; /* Full width for better visibility */
  height: 70vh; /* Takes majority of the screen */
  border: 1px solid #eaeaea;
  border-radius: 10px;
  overflow: hidden;
}

.info-container {
  width: 80%; /* Less space for info */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 20px;
}

.info-panel {
  flex: 1;
  padding: 1.5rem;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}      
.info-panel:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
    .info-container {
        flex-direction: column; /* Stack info below 3D model on small screens */
        width: 100%;
    }
}

.viewer-container,
.info-container {
      width: 100%;
   }
}

.info-panel h2 {
    margin-top: 0;
    color: #333;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 0.5rem;
}

.model-info p {
    margin: 0.7rem 0;
}

.error {
    color: #e53e3e;
    font-weight: 500;
    padding: 0.5rem;
    background-color: #fed7d7;
    border-radius: 5px;
}
      `}</style>
    </div>
  );
}
