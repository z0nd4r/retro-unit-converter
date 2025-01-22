let currentType = 'length';

function setupEventListeners() {
  document.querySelectorAll('.type-btn').forEach(btn => {
    btn.addEventListener('click', () => handleTypeChange(btn));
  });

  document.getElementById('convert-btn').addEventListener('click', convert);
  document.getElementById('length-unit').addEventListener('change', toggleUnitSelects);
  document.getElementById('mass-unit').addEventListener('change', toggleUnitSelects);
}

function handleTypeChange(btn) {
  document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentType = btn.dataset.type;
  toggleUnitSelects();
}

function toggleUnitSelects() {
  const lengthSelect = document.getElementById('length-unit');
  const massSelect = document.getElementById('mass-unit');
  
  if (currentType === 'length') {
    lengthSelect.style.display = 'block';
    massSelect.style.display = 'none';
  } else {
    lengthSelect.style.display = 'none';
    massSelect.style.display = 'block';
  }
}

function displayResults(results) {
  const resultsGrid = document.querySelector('.results-grid');
  
  if (typeof results === 'string') {
    // Remove any newlines and ensure it's a single line
    const cleanResults = results.replace(/\n/g, '').trim();
    
    if (cleanResults.includes(',')) {
      const resultsList = cleanResults.split(',').map(item => {
        const [value, unit] = item.trim().split(' ');
        return {
          value: parseFloat(value),
          unit: unit
        };
      });

      resultsGrid.innerHTML = resultsList.map(result => `
        <div class="result-card">
          <div class="result-value">${parseFloat(result.value).toFixed(2)}</div>
          <div class="result-unit">${result.unit}</div>
        </div>
      `).join('');
    } else {
      resultsGrid.innerHTML = `<div class="error-message">${cleanResults}</div>`;
    }
  } else {
    resultsGrid.innerHTML = `<div class="error-message">Invalid response format</div>`;
  }
}

async function convert() {
  const value = document.getElementById('input-value').value;
  const fromUnit = currentType === 'length' 
    ? document.getElementById('length-unit').value 
    : document.getElementById('mass-unit').value;
  
  if (!value || isNaN(parseFloat(value))) {
    displayResults('Please enter a valid numeric value');
    return;
  }

  const requestBody = {
    request_type: currentType === 'length' ? 'Длина' : 'Масса',
    target: fromUnit,
    data_int_float: parseFloat(value)
  };

  try {
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.request_string) {
      throw new Error('Invalid response format');
    }
    
    displayResults(data.request_string);
  } catch (error) {
    console.error('Error converting:', error);
    displayResults('Error occurred during conversion');
  }
}

function init() {
  setupEventListeners();
  toggleUnitSelects();
}

init();