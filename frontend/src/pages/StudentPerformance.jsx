import { useState } from "react";

export default function StudentPerformancePredictor() {
  const [studentData, setStudentData] = useState({
    G1: "",
    G2: "",
    age: "",
    Medu: "",
    Fedu: "",
    studytime: "",
    failures: "",
    freetime: "",
    goout: "",
    Dalc: "",
    Walc: "",
    health: "",
    absences: "",
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8080/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          G1: parseInt(studentData.G1),
          G2: parseInt(studentData.G2),
          age: parseInt(studentData.age),
          Medu: parseInt(studentData.Medu),
          Fedu: parseInt(studentData.Fedu),
          studytime: parseInt(studentData.studytime),
          failures: parseInt(studentData.failures),
          freetime: parseInt(studentData.freetime),
          goout: parseInt(studentData.goout),
          Dalc: parseInt(studentData.Dalc),
          Walc: parseInt(studentData.Walc),
          health: parseInt(studentData.health),
          absences: parseInt(studentData.absences),
        }),
      });
      const data = await response.json();
      setPrediction(data["Predicted Final Grade (G3)"]);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-xl font-bold mb-4">Student Performance Predictor</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(studentData).map((key) => (
          <input
            key={key}
            type="number"
            name={key}
            value={studentData[key]}
            onChange={handleChange}
            placeholder={key}
            className="p-2 border rounded-md w-full"
          />
        ))}
      </div>
      <button
        onClick={handlePredict}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Predicting..." : "Predict Performance"}
      </button>
      {prediction !== null && (
        <div className="mt-4 p-4 bg-green-100 border border-green-500 rounded-lg">
          <p className="text-green-700 font-semibold">Predicted Final Grade (G3): {prediction}</p>
        </div>
      )}
    </div>
  );
}
