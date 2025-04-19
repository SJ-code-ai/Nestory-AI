import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function App() {
  const [products, setProducts] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const headers = data[0];
      const items = data.slice(1).map(row => {
        const obj = {};
        row.forEach((cell, i) => {
          obj[headers[i]] = cell;
        });
        return obj;
      });
      setProducts(items);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Nestory.ai Full MVP</h1>
      <input type="file" accept=".xlsx, .csv" onChange={handleFileUpload} />
      {products.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Uploaded Products</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {products.map((product, index) => (
              <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
                <strong>{product['Product Name'] || 'Unnamed'}</strong>
                <p>{product.Description || ''}</p>
                <p>{product.Dimensions || ''}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;