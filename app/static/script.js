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

const convertButton = document.getElementById('convert-btn');
convertButton.addEventListener('click', async () => {
  try {
    await convert();
    console.log('Conversion finished successfully');
  } catch (error) {
    console.error('Conversion failed with error:', error);
  }
});

async function convert() {
  const valueInput = document.getElementById('input-value');
  const lengthUnitSelect = document.getElementById('length-unit');
  const massUnitSelect = document.getElementById('mass-unit');
    if (!valueInput) {
        console.error('Element with id="input-value" not found!');
        return;
    }
    if (!lengthUnitSelect) {
       console.error('Element with id="length-unit" not found!');
       return;
    }
    if (!massUnitSelect) {
      console.error('Element with id="mass-unit" not found!');
      return;
    }


    const value = valueInput.value;


    const activeTypeButton = document.querySelector('.type-btn.active');
    const currentType = activeTypeButton.getAttribute('data-type');
    const unitSelect = currentType === 'length' ? lengthUnitSelect : massUnitSelect;
    const fromUnit = unitSelect.value;


    if (!value || isNaN(parseFloat(value))) {
        displayResults('Please enter a valid numeric value');
        valueInput.classList.add('error');
        return;
    } else {
        valueInput.classList.remove('error');
    }


    const requestBody = {
        request_type: currentType === 'length' ? 'Длина' : 'Масса',
        target: fromUnit,
        data_int_float: parseFloat(value)
    };

    try {
        const headers = {
            'Content-Type': 'application/json'
        }


        const lastModified = localStorage.getItem('lastModified');
        if(lastModified) {
            headers['If-Modified-Since'] = lastModified;
        }

        const response = await fetch('/converter/api', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody)
        });

        if (response.status === 304) {
            const cachedResults = localStorage.getItem('cachedResults');
            if(cachedResults) {
                displayResults(cachedResults);
            } else {
                console.log("304, no cached results.")
            }
            return;
        }

        if (!response.ok) {
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
                const errorData = await response.json();
                if (errorData && errorData.message) {
                    errorMessage += ` - Server message: ${errorData.message}`;
                }
            } catch (jsonError) { }
            throw new Error(errorMessage);
        }
        const data = await response.json();
        if (!data.request_string) {
            throw new Error('Invalid response format: missing "request_string"');
        }
        localStorage.setItem('cachedResults', data.request_string);
        const date = response.headers.get('Last-Modified');
        if(date) {
            localStorage.setItem('lastModified', date);
        }

        displayResults(data.request_string);
    } catch (error) {
        console.error('Error converting:', error);
        displayResults(`Error occurred during conversion: ${error.message}`);
    }
}

function displayResults(results) {
    const resultsGrid = document.querySelector('.results-grid');
    resultsGrid.innerHTML = '';


  if (Array.isArray(results)) {
      if (results.length === 0) {
          resultsGrid.innerHTML = `<div class="error-message">Нет результатов</div>`;
      } else {
        results.forEach(result => {
              if(typeof result === 'object' && result !== null &&
                  'value' in result && 'unit' in result) {
                  const value = parseFloat(result.value);
                  if (Number.isFinite(value)) {
                      resultsGrid.innerHTML += `
                          <div class="result-card">
                              <div class="result-value">${value.toFixed(2)}</div>
                              <div class="result-unit">${result.unit}</div>
                          </div>
                      `;
                  } else {
                      resultsGrid.innerHTML += `<div class="error-message">Неверный формат значения: ${result.value}</div>`;
                  }
              } else {
                resultsGrid.innerHTML += `<div class="error-message">Неверный формат результата</div>`;
              }
        });
     }
  } else if(typeof results === 'string') {
        resultsGrid.innerHTML = `<div class="error-message">${results}</div>`;
  } else {
        resultsGrid.innerHTML = `<div class="error-message">Invalid response format</div>`;
  }
}


const typeButtons = document.querySelectorAll('.type-btn');
const lengthUnitSelect = document.getElementById('length-unit');
const massUnitSelect = document.getElementById('mass-unit');

typeButtons.forEach(button => {
    button.addEventListener('click', function() {
        typeButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const type = this.getAttribute('data-type');

        if (type === 'length') {
           lengthUnitSelect.style.display = 'inline-block';
            massUnitSelect.style.display = 'none';
            lengthUnitSelect.setAttribute('data-type', 'length');
        } else {
           massUnitSelect.style.display = 'inline-block';
           lengthUnitSelect.style.display = 'none';
            massUnitSelect.setAttribute('data-type', 'mass');
        }
    });
});
typeButtons[0].click();




function init() {
  setupEventListeners();
  toggleUnitSelects();
}

init();