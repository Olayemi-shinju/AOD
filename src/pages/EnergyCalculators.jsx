import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import budget from '../assets/images/budget.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const EnergyCalculators = () => {
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [duration, setDuration] = useState(1);
  const [selectedState, setSelectedState] = useState('');
  const [view, setView] = useState(false);
  const [availableAppliances, setAvailableAppliances] = useState([]);
  const [selectedAppliances, setSelectedAppliances] = useState([]);
  const [propertyType, setPropertyType] = useState('');
  const [systemType, setSystemType] = useState('');
  const [batteryType, setBatteryType] = useState('');

  useEffect(() => {
    const fetchElectronic = async () => {
      try {
        const resp = await axios.get(`${VITE_API_BASE_URL}/electronics/get-all-electronics`);
        if (resp.data.success) {
          setAvailableAppliances(resp.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchElectronic();
  }, []);

  const handleView = () => setView(true);

  const addAppliance = () => {
    setSelectedAppliances([...selectedAppliances, { name: '', Wattage: '', units: '' }]);
  };

  const updateAppliance = (index, field, value) => {
    const updated = [...selectedAppliances];
    if (field === 'name') {
      const selected = availableAppliances.find(opt => opt.name === value);
      updated[index].name = value;
      updated[index].Wattage = selected ? selected.Wattage : '';
    } else {
      updated[index][field] = value;
    }
    setSelectedAppliances(updated);
  };

  const calculateTotal = (Wattage, units) => {
    const w = parseFloat(Wattage);
    const u = parseInt(units);
    return isNaN(w) || isNaN(u) ? '' : w * u;
  };

  const isBatteryTypeReady = batteryType && selectedAppliances.length > 0 && selectedAppliances.every(a => a.name && a.units);

  const don = () => {
    console.log("Don function triggered");
    alert("Don function triggered!");
  };

  return (
    <div className='px-4 sm:px-10 md:px-14 pt-24 pb-7'>
      <Helmet>
        <title>Energy Calculator | Power Your Needs</title>
        <meta name="description" content="Use our Energy Calculator to determine the best inverter, battery, and solar system setup for your home or office in Nigeria." />
        <meta name="keywords" content="Energy calculator, solar inverter calculator, battery size calculator, Nigeria, solar power, energy needs, power consumption" />
        <meta name="author" content="Your Company Name" />
      </Helmet>

      {!view ? (
        <div className='max-w-xl mx-auto flex flex-col items-center gap-3'>
          <img src={budget} alt="" className='w-[300px]' />
          <div className='mt-6 text-center'>
            <h1 className='font-bold text-3xl'>Energy Calculator</h1>
            <p className='text-sm text-gray-400 mt-2'>
              We understand that you may not know your energy needs<br />
              and what products to purchase so we're here to help you out.
            </p>
            <button onClick={handleView} className='px-7 mt-4 py-3 bg-blue-500 rounded-md text-white'>Begin</button>
          </div>
        </div>
      ) : (
        <div className='max-w-4xl mx-auto bg-white py-10 px-4 sm:px-10 shadow rounded-lg'>
          <div className='text-center mb-6'>
            <p className='text-3xl font-bold'>Energy Calculator</p>
            <div className='text-sm text-gray-400 mt-2 flex justify-center gap-2'>
              <Link to='/'>Home</Link>
              <li className='list-disc'>Energy Calculator</li>
            </div>
          </div>

          <div className='mb-10'>
            <h2 className="text-2xl font-semibold mb-2">1. Property</h2>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input type="radio" name="propertyType" value="residential" className="form-radio h-5 w-5 text-blue-600" onChange={() => setPropertyType('residential')} />
                <span className="text-lg">Residential</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="radio" name="propertyType" value="commercial" className="form-radio h-5 w-5 text-blue-600" onChange={() => setPropertyType('commercial')} />
                <span className="text-lg">Commercial</span>
              </label>
            </div>
            {propertyType === 'commercial' && <p className='mt-3 text-gray-600'>For commercial properties, <Link to='/contact' className='text-blue-600 underline'>contact us</Link></p>}
            <hr className="mt-6 border-gray-200" />
          </div>

          {propertyType === 'residential' && (
            <>
              <div className='mb-10'>
                <h2 className="text-2xl font-semibold mb-2">2. System</h2>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input type="radio" name="systemType" value="inverter" className="form-radio h-5 w-5 text-blue-600" onChange={() => setSystemType('inverter')} />
                    <span className="text-lg">Inverter & Battery System</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="radio" name="systemType" value="inverter_solar" className="form-radio h-5 w-5 text-blue-600" onChange={() => setSystemType('inverter_solar')} />
                    <span className="text-lg">Inverter, Battery & Solar System</span>
                  </label>
                </div>
                <hr className="mt-6 border-gray-200" />
              </div>

              {systemType && (
                <div className='mb-10'>
                  <h2 className="text-2xl font-semibold mb-2">3. Battery</h2>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="radio" name="batteryType" value="drycell" className="form-radio h-5 w-5 text-blue-600" onChange={() => setBatteryType('drycell')} />
                      <span className="text-lg">Dry Cell/Tubular Battery</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="radio" name="batteryType" value="lithium" className="form-radio h-5 w-5 text-blue-600" onChange={() => setBatteryType('lithium')} />
                      <span className="text-lg">Lithium Battery</span>
                    </label>
                  </div>
                  <hr className="mt-6 border-gray-200" />
                </div>
              )}

              {batteryType && (
                <>
                  <div className='mb-10'>
                    <h2 className="text-2xl font-semibold mb-2">4. Appliances</h2>
                    <div className="hidden sm:grid grid-cols-4 font-semibold text-gray-800 border-b pb-2 mb-4">
                      <span>Appliance</span>
                      <span>Wattage (W)</span>
                      <span>Unit(s)</span>
                      <span>Total (W)</span>
                    </div>

                    {selectedAppliances.map((item, index) => (
                      <div key={index} className="mb-4">
                        <div className="sm:hidden font-semibold text-gray-700 mb-1">
                          Appliance {index + 1}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                          <select
                            className="border rounded px-3 py-2"
                            value={item.name}
                            onChange={(e) => updateAppliance(index, 'name', e.target.value)}
                          >
                            <option value="">Select</option>
                            {availableAppliances.map(opt => (
                              <option key={opt.name} value={opt.name}>{opt.name}</option>
                            ))}
                          </select>

                          <input
                            type="number"
                            className="border rounded px-3 py-2"
                            value={item.Wattage}
                            placeholder="Auto-filled"
                            disabled
                          />

                          <input
                            type="number"
                            className="border rounded px-3 py-2"
                            value={item.units}
                            placeholder="Enter units"
                            onChange={(e) => updateAppliance(index, 'units', e.target.value)}
                          />

                          <input
                            type="text"
                            className="border rounded px-3 py-2 bg-gray-100"
                            value={calculateTotal(item.Wattage, item.units)}
                            placeholder="Auto-calculated"
                            disabled
                          />
                        </div>
                      </div>
                    ))}

                    <button onClick={addAppliance} className="text-blue-600 mt-2 hover:underline font-medium">+ Add Appliance</button>
                  </div>

                  {isBatteryTypeReady && (
                    <>
                      <div className='mb-10'>
                        <h2 className="text-2xl font-semibold mb-2">5. Duration (hrs)</h2>
                        <input type="number" className="w-full border rounded p-4 outline-none" placeholder="e.g. 5" value={duration} onChange={(e) => setDuration(e.target.value)} />
                        <hr className="mt-6 border-gray-200" />
                      </div>

                      {systemType === 'inverter_solar' && (
                        <div className='mb-10'>
                          <h2 className="text-2xl font-semibold mb-2">6. Location</h2>
                          <select className="w-full border rounded p-4 outline-none" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                            <option value="">Select a State</option>
                            {NIGERIAN_STATES.map(state => (
                              <option key={state} value={state}>{state}</option>
                            ))}
                          </select>
                          <hr className="mt-6 border-gray-200" />
                        </div>
                      )}

                      <div className='text-center mt-8'>
                        <button
                          onClick={don}
                          className='px-10 py-3 w-full font-semibold cursor-pointer bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700 transition'
                        >
                          Calculate System
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EnergyCalculators;
