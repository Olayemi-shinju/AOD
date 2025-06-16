import React from 'react';

const stats = [
  { number: '200+', label: 'Happy Customers' },
  { number: '3', label: 'Years Active' },
  { number: '50+', label: 'Product Orders' },
  { number: '150+', label: 'Quality Products' },
];

const infoCards = [
  'We have something for everyone.',
  'We’ll be glad to work with you!',
  'Whatever you’re shopping for',
  'We work with trusted vendors',
];

const About = () => {
  return (
    <div className="px-6 lg:px-20 py-20">
      <style>{`
        .info-card {
          transition: box-shadow 0.3s ease;
        }
        .info-card:hover {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <p className="text-sm text-blue-600 font-medium mb-2">About Us</p>
      <h1 className="text-4xl font-bold leading-snug max-w-2xl mb-10">
        Africa’s number one solar marketplace
      </h1>

      <img
        src="https://www.ecofluxng.com/assets/img/about/about.jpg"
        alt="solar"
        className="w-full rounded mb-12 object-cover max-h-[500px]"
      />

      <div className="text-gray-700 space-y-6 max-w-3xl mb-20 text-lg">
        <p>
          We are thrilled to offer you a wide range of products that suit your needs. Whether you're shopping for solar panels, inverters, batteries or something else, we have something for everyone.
        </p>
        <p>
          Our commitment to quality is reflected in every product we offer. We work with top vendors and manufacturers to ensure that every item we sell meets our high standards for durability, performance, and efficiency. And with a user-friendly interface and intuitive navigation, shopping on our site is a breeze.
        </p>
        <p>
          We understand that security is a top concern for online shoppers, which is why we employ the latest encryption technologies and follow industry best practices to keep your personal information safe. And with fast, reliable shipping options, you can enjoy your purchases in no time.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center mb-20">
        {stats.map((item, idx) => (
          <div key={idx}>
            <p className="text-blue-600 font-bold text-2xl">{item.number}</p>
            <p className="text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {infoCards.map((text, idx) => (
          <div
            key={idx}
            className="info-card border rounded-lg p-6 text-center"
          >
            <p className="text-gray-700 font-medium">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
