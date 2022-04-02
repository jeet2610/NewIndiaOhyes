import React from 'react';

const Popup = ({ config = {} }) => (
    <div className={`${config.bg?.includes('green') ? 'bg-green-300' : 'bg-red-300'} bg-opacity-90 bottom-0 fixed w-full p-8 text-gray-light text-center z-40 transform transition-all ${config.visible ? 'opacity-1 visible scale-1' : 'opacity-0 invisible scale-50'}`}>
        {config.message}
    </div>
);

export default Popup;