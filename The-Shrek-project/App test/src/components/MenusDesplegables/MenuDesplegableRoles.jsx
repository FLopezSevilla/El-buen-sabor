import { useState } from 'react';

const DropdownRol = ({ onSelectOptionRol }) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const handleSelect = (option) => {
    console.log(option)
    setSelectedOption(option);
    onSelectOptionRol(option);
  };
  return (
    <div>
      <label>
        Rol:
        <select value={selectedOption} onChange={(e) => handleSelect(e.target.value)}>
        <option value="COCINERO" key={0}>Cocinero</option>
        <option value="REPARTIDOR" key={1}>Repartidor</option>
        <option value="CAJERO" key={2}>Cajero</option>
        </select>        
      </label>
    </div>
  );
};

export default DropdownRol;