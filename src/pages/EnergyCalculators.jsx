import { useState } from 'react'
import budget from '../assets/images/budget.png'
import { Link } from 'react-router-dom'
import finish from '../assets/images/check-mark.png'

const APPLIANCE_OPTIONS = [
    { name: 'Fan', wattage: 70 },
    { name: 'TV', wattage: 120 },
    { name: 'Fridge', wattage: 200 },
    { name: 'Light Bulb', wattage: 60 },
    { name: 'AC', wattage: 1500 },
    { name: 'Laptop', wattage: 90 },
    { name: 'Microwave', wattage: 1000 },
    { name: 'Washer', wattage: 500 }
];

const NIGERIAN_STATES = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
    "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
    "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
    "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
    "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];




const EnergyCalculators = () => {
    const [duration, setDuration] = useState(1); // default 1 hour
    const [showModal, setShowModal] = useState(false);
    const [selectedState, setSelectedState] = useState('');
    const [view, setView] = useState(false);
    const [appliances, setAppliances] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [propertyType, setPropertyType] = useState('');
    const [systemType, setSystemType] = useState('');
    const [batteryType, setBatteryType] = useState('');


    const handleView = () => setView(!view);

    const addAppliance = () => {
        setAppliances([...appliances, { name: '', wattage: '', units: '' }]);
    };

    const updateAppliance = (index, field, value) => {
        const updated = [...appliances];
        if (field === 'name') {
            const selected = APPLIANCE_OPTIONS.find(opt => opt.name === value);
            updated[index].name = value;
            updated[index].wattage = selected ? selected.wattage : '';
        } else {
            updated[index][field] = value;
        }
        setAppliances(updated);
    };

    const calculateTotal = (wattage, units) => {
        const w = parseFloat(wattage);
        const u = parseInt(units);
        return isNaN(w) || isNaN(u) ? '' : w * u;
    };

    const calculateGrandTotal = () => {
        return appliances.reduce((total, item) => {
            const wattage = parseFloat(item.wattage);
            const units = parseInt(item.units);
            if (!isNaN(wattage) && !isNaN(units)) {
                return total + wattage * units;
            }
            return total;
        }, 0);
    };

    const submitToBackend = async () => {
        setLoading(true);
        setSuccess(false);

        const payload = {
            appliances: appliances.map(item => ({
                name: item.name,
                wattage: parseFloat(item.wattage),
                units: parseInt(item.units),
                total: calculateTotal(item.wattage, item.units)
            })),
            grandTotal: calculateGrandTotal()
        };

        console.log("🚀 Sending Payload:", payload);

        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1000);
    };

    const isFormComplete = () => {
        return (
            propertyType === 'residential' &&
            systemType &&
            batteryType &&
            duration &&
            selectedState &&
            appliances.length > 0 &&
            appliances.every(a => a.name && a.units)
        );
    };

    return (
        <div className='px-14 pt-24 pb-7'>
            <div className={`${view === true ? 'hidden' : 'block'} w-[60%] mx-auto flex justify-center items-center flex-col gap-3`}>
                <img src={budget} alt="" className='w-[300px]' />
                <div className='mt-6 leading-6 text-center'>
                    <h1 className='text-center font-bold text-3xl'>Energy Calculator</h1>
                    <p className='text-center text-sm text-gray-400 mt-2'>
                        We understand that you may not know your energy needs<br />
                        and what products to purchase so we're here to help you<br />
                        out.
                    </p>
                    <button onClick={handleView} className='wish px-7 mt-4 cursor-pointer py-3 bg-blue-500 rounded-md text-white'>Begin</button>
                </div>
            </div>

            <div className={`${view === true ? 'block' : 'hidden'}`}>
                <div className='text-center mb-6'>
                    <p className='text-3xl font-bold'>Energy Calculator</p>
                    <div className='text-sm text-gray-400 mt-2 justify-center flex gap-2'>
                        <Link to='/'>Home</Link>
                        <li className='list-disc'>Energy Calculator</li>
                    </div>
                </div>

                <div className="mx-auto bg-white py-12 px-10 w-[65%] shadow rounded-lg">
                    {/* 1. Property */}
                    <div className='mb-10'>
                        <h2 className="text-2xl font-semibold mb-2">1. Property</h2>
                        <p className="text-gray-600 mb-4">What kind of property are you looking to estimate for?</p>
                        <div className="space-y-3">
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input type="radio" name="propertyType" value="residential" className="form-radio h-5 w-5 text-blue-600"
                                    onChange={() => setPropertyType('residential')} />
                                <span className="text-gray-800 text-lg">Residential</span>
                            </label>
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input type="radio" name="propertyType" value="commercial" className="form-radio h-5 w-5 text-blue-600"
                                    onChange={() => setPropertyType('commercial')} />
                                <span className="text-gray-800 text-lg">Commercial</span>
                            </label>
                        </div>

                        {propertyType === 'commercial' && (
                            <p className='mt-3 text-gray-600'>For commercial properties, reach out to us <Link to='/contact' className='text-blue-600 underline'>here</Link></p>
                        )}
                        <hr className="mt-6 border-gray-200" />
                    </div>

                    {/* 2. System */}
                    {propertyType === 'residential' && (
                        <div className='mb-10'>
                            <h2 className="text-2xl font-semibold mb-2">2. System</h2>
                            <p className="text-gray-600 mb-4">What System Do You Want?</p>
                            <div className="space-y-3">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input type="radio" name="systemType" value="inverter" className="form-radio h-5 w-5 text-blue-600"
                                        onChange={() => setSystemType('inverter')} />
                                    <span className="text-gray-800 text-lg">Inverter & Battery System</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input type="radio" name="systemType" value="inverter_solar" className="form-radio h-5 w-5 text-blue-600"
                                        onChange={() => setSystemType('inverter_solar')} />
                                    <span className="text-gray-800 text-lg">Inverter, Battery & Solar System</span>
                                </label>
                            </div>
                            <hr className="mt-6 border-gray-200" />
                        </div>
                    )}

                    {/* 3. Battery */}
                    {systemType && (
                        <div className='mb-10'>
                            <h2 className="text-2xl font-semibold mb-2">3. Battery</h2>
                            <p className="text-gray-600 mb-4">What Battery Works For You?</p>
                            <div className="space-y-3">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input type="radio" name="batteryType" value="drycell" className="form-radio h-5 w-5 text-blue-600"
                                        onChange={() => setBatteryType('drycell')} />
                                    <span className="text-gray-800 text-lg">Dry Cell/Tubular Battery</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input type="radio" name="batteryType" value="lithium" className="form-radio h-5 w-5 text-blue-600"
                                        onChange={() => setBatteryType('lithium')} />
                                    <span className="text-gray-800 text-lg">Lithium Battery</span>
                                </label>
                            </div>
                            <p className='text-gray-500 text-sm mt-3'>
                                Dry cell/Tubular batteries are reliable for backup power in homes and offices... though at a higher cost.
                            </p>
                            <hr className="mt-6 border-gray-200" />
                        </div>
                    )}

                    {/* 4. Appliances */}
                    {batteryType && (
                        <>
                            <div className='mb-10'>
                                <h2 className="text-2xl font-semibold mb-2">4. Appliances</h2>
                                <p className="text-gray-600">What appliances would you want to power?</p>
                                <p className="text-gray-500 mb-4">
                                    Please indicate the specific units and wattage of these appliances for more accurate results.
                                </p>

                                <div className="grid grid-cols-4 font-semibold text-gray-800 border-b pb-2 mb-4">
                                    <span>Appliance</span>
                                    <span>Wattage (W)</span>
                                    <span>Unit(s)</span>
                                    <span>Total (W)</span>
                                </div>

                                {appliances.map((item, index) => (
                                    <div key={index} className="grid grid-cols-4 gap-4 mb-3">
                                        <select
                                            className="border rounded px-3 py-2"
                                            value={item.name}
                                            onChange={(e) => updateAppliance(index, 'name', e.target.value)}
                                        >
                                            <option value="">Select</option>
                                            {APPLIANCE_OPTIONS.map(opt => (
                                                <option key={opt.name} value={opt.name}>{opt.name}</option>
                                            ))}
                                        </select>
                                        <input
                                            type="number"
                                            className="border rounded px-3 py-2"
                                            value={item.wattage}
                                            disabled
                                        />
                                        <input
                                            type="number"
                                            placeholder="e.g. 2"
                                            className="border rounded px-3 py-2"
                                            value={item.units}
                                            onChange={(e) => updateAppliance(index, 'units', e.target.value)}
                                        />
                                        <div className="py-2 border p-2 rounded">{calculateTotal(item.wattage, item.units)}</div>
                                    </div>
                                ))}

                                <button
                                    onClick={addAppliance}
                                    className="text-blue-600 mt-2 hover:underline font-medium"
                                >
                                    + Add Appliance
                                </button>
                            </div>

                            {/* Duration */}
                            <div className='mb-10'>
                                <h2 className="text-2xl font-semibold mb-2">5. Duration</h2>
                                <p className="text-gray-600 mb-4">How many hours of backup power would you require before needing to be recharged?</p>
                                <input className='w-full border rounded p-4 outline-none'
                                    type="number"
                                    placeholder="1"

                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                />

                                <hr className="mt-6 border-gray-200" />
                            </div>

                            {/* State */}
                            <div className='mb-10'>
                                <h2 className="text-2xl font-semibold mb-2">6. Location</h2>
                                <p className="text-gray-600 mb-4">Where are you located?</p>
                                <select
                                    className="w-full border rounded p-4 outline-none"
                                    value={selectedState}
                                    onChange={(e) => setSelectedState(e.target.value)}
                                >
                                    <option value="">Select a State</option>
                                    {NIGERIAN_STATES.map((state) => (
                                        <option key={state} value={state}>{state}</option>
                                    ))}
                                </select>
                                <hr className="mt-6 border-gray-200" />
                            </div>
                        </>
                    )}

                    {/* Calculate button */}
                    {isFormComplete() && (
                        <div>
                            <button
                                onClick={() => setShowModal(true)}
                                className='w-full p-4 text-lg text-white font-semibold cursor-pointer wish bg-blue-600'
                            >
                                Calculate
                            </button>

                        </div>
                    )}
                </div>
            </div>
            {showModal && (

                <div>
                    <div
                        className="fixed inset-0 bg-black opacity-60 z-30 flex justify-center items-center"
                        onClick={() => setShowModal(false)}
                    >
                    </div>
                    <div
                        className="bg-white no-scrollbar overflow-y-auto fixed lg:h-[450px] lg:w-[60%] inset-0 m-auto z-50 rounded-xl p-6 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="lg:text-4xl text-xl font-bold mb-4 text-center">Energy Calculator</h2>

                        <div className="text-gray-700 text-sm space-y-3">
                            <p className="text-2xl text-center font-bold">Your Energy Recommendation:</p>


                            <div className='lg:flex md:flex sm:flex xs:flex items-center gap-4'>
                                <div>
                                    <img src={finish} alt="" className='w-[150px]'/>
                                </div>

                                <ul className="list-disc lg:flex flex-col lg:gap-6 list-inside space-y-1 text-[15px]">
                                    <li className='lg:text-3xl list-none lg:flex lg:gap-7 items-center'>
                                        <p className='text-xl font-semibold'>Inverter Capacity:</p>{" "}
                                        {(calculateGrandTotal() / 1000 * 1.2).toFixed(1)} kVA
                                    </li>
                                    <li className='lg:text-3xl list-none lg:flex lg:gap-7 items-center'>
                                        <p className='text-xl font-semibold'>Battery Capacity:</p>{" "}
                                        {((calculateGrandTotal() * duration) / 1000).toFixed(1)} kWh
                                    </li>
                                    <li className='lg:text-3xl list-none lg:flex lg:gap-7 items-center'>
                                        <p className='text-2xl font-semibold'>Solar Panel Capacity:</p>{" "}
                                        {(calculateGrandTotal()  / 1000 * 1.3).toFixed(3)} kWp
                                    </li>
                                </ul>
                            </div>

                            <p className="text-[13px] mt-10 text-center">
                                Don&apos;t understand this recommendation? Share your results with us{" "}
                                <Link to='/contact' className="text-blue-600 underline">here </Link>
                                or via live chat
                                for analysis and interpretation.
                            </p>
                        </div>

                        <div className="flex justify-center mt-6 mb-7">
                            <button
                                className="px-5 py-2 rounded border hover:bg-gray-100"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnergyCalculators;
