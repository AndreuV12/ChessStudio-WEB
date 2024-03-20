import React, { useState, useRef, useEffect } from 'react';
import './Menu.css';

const Menu = ({ children, label = "Menu", className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
        console.log("click");
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = (event) => {
    event.preventDefault(); // Evita entrar en el enlace
    setIsOpen(!isOpen);
  };

  return (
    <div className={`menu-container ${className}`} ref={menuRef}>
      <button onClick={toggleMenu} className="menu-toggle-btn">
        {label}
      </button>
      {isOpen && (
        <ol onClick={(event) => { event.stopPropagation(); event.preventDefault(); }} className="menu-items-container">
          {React.Children.map(children, (child, index) => (
            <li onClick={()=>{setIsOpen(false)}} key={index}>{child}</li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default Menu;