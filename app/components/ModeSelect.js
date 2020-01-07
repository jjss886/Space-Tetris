import React from "react";
import styled from "styled-components";

const StyledModeSelect = styled.div`
  box-sizing: border-box;
  margin: 0 0 20px 0;
  padding: 20px;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  border: none;
  color: white;
  background: #333;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
`;

const ModeSelect = ({ setModeHandler }) => (
  <StyledModeSelect>
    <span className="selectText">Mode: </span>
    <select className="selectDropdown" onChange={setModeHandler}>
      <option>Easy</option>
      <option>Medium</option>
      <option>Hard</option>
    </select>
  </StyledModeSelect>
);

export default ModeSelect;
