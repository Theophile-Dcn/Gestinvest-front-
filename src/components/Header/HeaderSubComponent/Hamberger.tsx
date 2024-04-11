import React, { useState } from 'react';

function SvgToggle() {
  const [showFirst, setShowFirst] = useState(true);

  const toggleSvg = () => {
    setShowFirst(!showFirst);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Vérifiez si la touche appuyée est la touche "Enter"
    if (event.key === 'Enter') {
      toggleSvg();
    }
  };

  return (
    <div className="flex items-center justify-center">
      {showFirst ? (
        <i
          className="flex items-center justify-center"
          onClick={toggleSvg}
          onKeyDown={handleKeyDown} // Ajout de la gestion de l'événement clavier
          role="button"
          tabIndex={0} // Rendre l'élément focusable
        >
          {/* Ajoutez un label textuel pour l'accessibilité */}
          <span className="sr-only">Toggle Button</span>
          <svg
            className="w-full text-center justify-center"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="30px"
            height="30px"
            fill="white"
          >
            <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z" />
          </svg>
        </i>
      ) : (
        <i
          className=""
          onClick={toggleSvg}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              toggleSvg();
            }
          }}
          role="button"
          tabIndex={0}
        >
          {/* Ajoutez un label textuel pour l'accessibilité */}
          <span className="sr-only">Toggle Button</span>
          <svg
            className="w-full text-center"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="30px"
            height="30px"
            fill="white"
          >
            <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" />
          </svg>
        </i>
      )}
    </div>
  );
}

export default SvgToggle;
