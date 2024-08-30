import React, { useState, useEffect } from 'react';

const Alert = ({ successAlert }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (successAlert === false) {
      setShow(true);
      const timeoutId = setTimeout(() => setShow(false), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [successAlert]);

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="border-4 border-white bg-green-600 text-white px-6 py-8 rounded-lg shadow-lg text-center">
        <span className="text-2xl font-semibold">Order added successfully!</span>
      </div>
    </div>
  );
};

export default Alert;