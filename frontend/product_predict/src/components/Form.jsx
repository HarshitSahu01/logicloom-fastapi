import { useState } from "react";
import { motion } from "framer-motion";

export default function ProductCategoryPredictor() {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const handlePredict = async () => {
    if (!description.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/predict?desc=${encodeURIComponent(description)}`
      );
      const data = await response.json();
      setResult(data.category || data.message || "No category found");
    } catch (error) {
      setResult("Error connecting to server.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f0036] via-[#3c006d] to-[#120026] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#2b0052] bg-opacity-60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-xl w-full border border-purple-600"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold mb-6 text-center text-purple-200"
        >
          🔮 Product Category Predictor
        </motion.h1>

        <label className="block mb-2 text-sm font-medium text-purple-300">
          Describe the product or issue
        </label>
        <textarea
          rows="4"
          className="w-full p-3 bg-[#1a002f] text-purple-100 border border-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4 transition-all duration-200"
          placeholder="Eg. Headaches from eating too much chocolate"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={handlePredict}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          {loading ? "Predicting..." : "🔍 Predict"}
        </motion.button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center text-lg font-medium text-purple-100"
          >
            <span className="text-purple-300">Predicted Category:</span>{" "}
            <span className="font-bold text-pink-400">{result}</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
