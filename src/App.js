import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      formData: {
        name: '',
        email: '',
        color: '',
      },
      errors: {},
      submissionStatus: false,
      submissionMessage: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value,
      },
    });
  };

  validateStep = () => {
    const { name, email, color } = this.state.formData;
    const newErrors = {};

    if (this.state.step === 1) {
      if (!name.trim()) {
        newErrors.name = 'Name is required';
      }
      if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
        newErrors.email = 'Valid email is required';
      }
    } else if (this.state.step === 2) {
      if (!color.trim()) {
        newErrors.color = 'Color is required';
      }
    }

    this.setState({
      errors: newErrors,
    });

    return Object.keys(newErrors).length === 0;
  };

  handleNext = () => {
    if (this.validateStep()) {
      if (this.state.step < 3) {
        this.setState({
          step: this.state.step + 1,
        });
      } else if (this.state.step === 3) {
        // Move to step 4 upon successful submission
        this.handleSubmit();
        this.setState({
          step: 4,
        });
      }
    }
  };

  handleBack = () => {
    this.setState({
      step: this.state.step - 1,
    });
  };

  handleSubmit = () => {
    if (this.validateStep()) {
      // Simulate a successful submission for demonstration
      this.setState({
        submissionStatus: true,
        submissionMessage: 'Successfully Submitted',
      });
    }
  };

  render() {
    const { step, formData, errors, submissionMessage } = this.state;

    return (
      <div className="App">
        <h1><center>Multi Step Form</center></h1>
        <div className="step-indicators">
          {[1, 2, 3, 4].map((number) => {
            return (
              <div
                key={number}
                className={`step-indicator ${number <= step ? 'active' : ''}`}
              >
                {number}
              </div>
            );
          })}
        </div>
        <div>
          {step === 1 && (
            <div>
              <h2>Step 1: Personal Information</h2>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={this.handleChange}
                placeholder="Name"
              />
              {errors.name && <div className="error">{errors.name}</div>}
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={this.handleChange}
                placeholder="Email"
              />
              {errors.email && <div className="error">{errors.email}</div>}
              <div className="button-container">
                <button onClick={this.handleNext} className='button1'>Next</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2>Step 2: Select a Color</h2>
              <select
                name="color"
                value={formData.color}
                onChange={this.handleChange}
              >
                <option value="">Select a color</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
              </select>
              {errors.color && <div className="error">{errors.color}</div>}
              <div className="button-container">
                <button onClick={this.handleBack} className='button2'>Previous</button>
                <button onClick={this.handleNext} className='button1'>Next</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2>Summary</h2>
              <p>Name: {formData.name}</p>
              <p>Email: {formData.email}</p>
              <p>Color: {formData.color}</p>
              <div className="button-container">
                <button onClick={this.handleBack} className='button2'>Previous</button>
                <button onClick={this.handleNext} className='button1'>
                  {step < 3 ? 'Next' : 'Submit'}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className='final'>
              <center>
                  <p className='message'>{submissionMessage}</p>
              </center>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
