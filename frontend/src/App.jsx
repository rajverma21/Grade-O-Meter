import { useEffect, useMemo, useState, useCallback } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

const PredictionForm = () => {
  const [init, setInit] = useState(false)
  const [formData, setFormData] = useState({
    age: '',
    Medu: 0,
    Fedu: 0,
    studytime: 1,
    failures: 0,
    freetime: 1,
    gout: 1,
    Dalc: 1,
    Walc: 1,
    health: 1,
    absences: ''
  })

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine)
    }).then(() => setInit(true))
  }, [])

  const particlesLoaded = useCallback(container => {
    console.log('Particles Loaded:', container)
  }, [])

  const options = useMemo(
    () => ({
      background: {
        color: '#1a202c'
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: 'push' },
          onHover: { enable: true, mode: 'repulse' }
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 200, duration: 0.4 }
        }
      },
      particles: {
        color: { value: '#ffffff' },
        links: {
          color: '#ffffff',
          distance: 120,
          enable: true,
          opacity: 0.6,
          width: 1
        },
        move: { enable: true, speed: 3, outModes: { default: 'bounce' } },
        number: { density: { enable: true, area: 800 }, value: 120 },
        opacity: { value: 0.6 },
        shape: { type: 'circle' },
        size: { value: { min: 2, max: 4 } }
      },
      detectRetina: true
    }),
    []
  )

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('Form Submitted Data:', formData)
  }

  return (
    <div className='relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden p-4'>
      {init && (
        <Particles
          id='tsparticles'
          particlesLoaded={particlesLoaded}
          options={options}
          className='absolute inset-0'
        />
      )}
      <div className='relative bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-lg border border-white/20 z-10 transition-transform hover:scale-105 duration-300'>
        <h2 className='text-3xl font-bold text-center mb-5 text-white'>
          Grade-O-Meter
        </h2>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div>
            <label className='block text-md font-medium text-white mb-1'>
              Age
            </label>
            <input
              type='number'
              name='age'
              value={formData.age}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-gray-800 text-white'
              required
            />
          </div>

          {[
            {
              name: 'Medu',
              label: "Mother's Education",
              options: [
                { label: 'None', value: 0 },
                { label: 'Primary', value: 1 },
                { label: 'Middle School', value: 2 },
                { label: 'High School', value: 3 },
                { label: 'Higher Education', value: 4 }
              ]
            },
            {
              name: 'Fedu',
              label: "Father's Education",
              options: [
                { label: 'None', value: 0 },
                { label: 'Primary', value: 1 },
                { label: 'Middle School', value: 2 },
                { label: 'High School', value: 3 },
                { label: 'Higher Education', value: 4 }
              ]
            },
            {
              name: 'studytime',
              label: 'Study Time',
              options: [
                { label: 'Less than 2 hours', value: 1 },
                { label: '2 to 5 hours', value: 2 },
                { label: '5 to 10 hours', value: 3 },
                { label: 'More than 10 hours', value: 4 }
              ]
            },
            {
              name: 'failures',
              label: 'Failures',
              options: [
                { label: 'None', value: 0 },
                { label: 'One', value: 1 },
                { label: 'Two', value: 2 },
                { label: 'Three', value: 3 },
                { label: 'Four or more', value: 4 }
              ]
            },
            {
              name: 'freetime',
              label: 'Free Time',
              options: [
                { label: 'Very Low', value: 1 },
                { label: 'Low', value: 2 },
                { label: 'Moderate', value: 3 },
                { label: 'High', value: 4 },
                { label: 'Very High', value: 5 }
              ]
            },
            {
              name: 'gout',
              label: 'Going Out',
              options: [
                { label: 'Rarely', value: 1 },
                { label: 'Sometimes', value: 2 },
                { label: 'Occasionally', value: 3 },
                { label: 'Often', value: 4 },
                { label: 'Very Frequently', value: 5 }
              ]
            },
            {
              name: 'Dalc',
              label: 'Workday Alcohol Consumption',
              options: [
                { label: 'Very Low', value: 1 },
                { label: 'Low', value: 2 },
                { label: 'Moderate', value: 3 },
                { label: 'High', value: 4 },
                { label: 'Very High', value: 5 }
              ]
            },
            {
              name: 'Walc',
              label: 'Weekend Alcohol Consumption',
              options: [
                { label: 'Very Low', value: 1 },
                { label: 'Low', value: 2 },
                { label: 'Moderate', value: 3 },
                { label: 'High', value: 4 },
                { label: 'Very High', value: 5 }
              ]
            },
            {
              name: 'health',
              label: 'Health',
              options: [
                { label: 'Very Poor', value: 1 },
                { label: 'Poor', value: 2 },
                { label: 'Average', value: 3 },
                { label: 'Good', value: 4 },
                { label: 'Excellent', value: 5 }
              ]
            }
          ].map(({ name, label, options }) => (
            <div key={name}>
              <label className='block text-md font-medium text-white mb-1'>
                {label}
              </label>
              <select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-gray-800 text-white'
              >
                {options.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div>
            <label className='block text-md font-medium text-white mb-1'>
              Absences
            </label>
            <input
              type='number'
              name='absences'
              value={formData.absences}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-gray-800 text-white'
              required
            />
          </div>

          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 font-semibold shadow-md'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default PredictionForm
