class Converter {
  constructor() {
    this.currentType = 'length';
    this.setupEventListeners();
    this.initializeConverter();
  }

  setupEventListeners() {
    // Type selection buttons
    document.querySelectorAll('.type-btn').forEach(btn => {
      btn.addEventListener('click', () => this.handleTypeChange(btn));
    });

    // Input value changes
    document.getElementById('input-value').addEventListener('input', () => this.convert());
    document.getElementById('input-unit').addEventListener('change', () => this.convert());
  }

  handleTypeChange(btn) {
    document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    this.currentType = btn.dataset.type;
    this.initializeConverter();
  }

  async initializeConverter() {
    const units = await this.fetchUnits(this.currentType);
    this.populateUnitSelect(units);
    this.convert();
  }

  async fetchUnits(type) {
    try {
      const response = await fetch(`https://api.example.com/units/${type}`);
      const data = await response.json();
      return data.units;
    } catch (error) {
      console.error('Error fetching units:', error);
      return [];
    }
  }

  populateUnitSelect(units) {
    const select = document.getElementById('input-unit');
    select.innerHTML = units.map(unit => 
      `<option value="${unit}">${unit}</option>`
    ).join('');
  }

  async convert() {
    const value = document.getElementById('input-value').value;
    const fromUnit = document.getElementById('input-unit').value;
    
    if (!value) {
      this.displayResults([]);
      return;
    }

    try {
      const response = await fetch('https://api.example.com/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: this.currentType,
          value: parseFloat(value),
          from_unit: fromUnit
        })
      });
      
      const results = await response.json();
      this.displayResults(results.conversions);
    } catch (error) {
      console.error('Error converting:', error);
      this.displayResults([]);
    }
  }

  displayResults(results) {
    const resultsGrid = document.querySelector('.results-grid');
    resultsGrid.innerHTML = results.map(result => `
      <div class="result-card">
        <div class="result-value">${result.value.toFixed(2)}</div>
        <div class="result-unit">${result.unit}</div>
      </div>
    `).join('');
  }
}

// Initialize the converter
new Converter();