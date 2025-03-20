// pages/api/nextjs-model-info.js
export default function handler(req, res) {
  // Hardcoded model information
  const modelInfo = {
    scale: "1.0",
    face_count: 412, // Example value
    created_by: "Paul Bourke, March 2012",
  };

  res.status(200).json(modelInfo);
}
