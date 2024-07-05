// components/IconWithText.js
import React from 'react';

const IconWithText = ({ icon, text }) => (
  <div className="flex gap-2 items-center">
    {icon}
    <span className="text-lg font-bold">{text}</span>
  </div>
);

export default IconWithText;
