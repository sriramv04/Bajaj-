import React, { useState } from 'react';

function App() {
  const [inputJson, setInputJson] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const jsonInput = JSON.parse(inputJson);
      if (!jsonInput || !jsonInput.data || !Array.isArray(jsonInput.data)) {
        throw new Error('Invalid JSON input');
      }
      const response = await fetch('/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonInput),
      });
      const responseData = await response.json();
      setResponse(responseData);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSelectChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedOptions(selectedOptions);
  };

  const renderResponse = () => {
    if (!response) return null;
    const filteredResponse = {};
    selectedOptions.forEach((option) => {
      if (option === 'Alphabets') {
        filteredResponse.alphabets = response.alphabets;
      } else if (option === 'Numbers') {
        filteredResponse.numbers = response.numbers;
      } else if (option === 'Highest Alphabet') {
        filteredResponse.highest_alphabet = response.highest_alphabet;
      }
    });
    return (
      <div>
        {Object.keys(filteredResponse).map((key) => (
          <div key={key}>
            <h2>{key}</h2>
            <ul>
              {filteredResponse[key].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>ABCD123</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputJson}
          onChange={(event) => setInputJson(event.target.value)}
          placeholder="Enter JSON input"
        />
        <button type="submit">Submit</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
      {response && (
        <div>
          <select multiple value={selectedOptions} onChange={handleSelectChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest Alphabet">Highest Alphabet</option>
          </select>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;