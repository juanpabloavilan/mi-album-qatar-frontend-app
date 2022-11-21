import React, {useState} from "react";
import StyledContainer from "./styled-components/StyledContainer";
import {BsFillArrowDownCircleFill} from 'react-icons/bs'

const Dropdown = ({ list, cambiarSeccion }) => {
  const [open, setOpen] = useState(false);
  return (
    <StyledContainer>
      <button
        className="drop-down-btn"
        onClick={() => {
          setOpen(!open);
        }}
      >
        Seleccionar <BsFillArrowDownCircleFill/>
      </button>
      {open && (
        <ul className="listSections">
          {list?.map((seccionValue) => {
            return (
              <li
                key={seccionValue}
                onClick={(e) => {
                  console.log("click en", seccionValue);
                  cambiarSeccion(seccionValue);
                  setOpen(false);
                }}
              >
                {seccionValue}
              </li>
            );
          })}
        </ul>
      )}
    </StyledContainer>
  );
};

export default Dropdown;
