import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert('Please enter some text!');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post('https://ct-5.onrender.com/predict/', {
        text: text,
      });
      setPrediction(response.data.prediction);
    } catch (err) {
      setError('Error occurred while fetching prediction.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="marquee-bar">
        <marquee behavior="scroll" direction="left">
          ⚖️ Justice delayed is justice denied · 📚 AI Legal Advisor · 🏛️ Know Your Rights · 🕊️ Fairness. Accuracy. Empowerment.
        </marquee>
      </div>

      <h1>Legal Text Classifier</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your legal text here"
          rows="10"
          cols="50"
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Classifying...' : 'Classify'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {prediction && (
        <div>
          <h3>Prediction Result:</h3>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
}

export default App;