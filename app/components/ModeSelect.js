import React from "react";
import styled from "styled-components";

const StyledModeSelect = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 20px 0;
  padding: 20px;
  border: 4px solid #333;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  color: #999;
  background: #000;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
`;

const ModeSelect = ({ setModeHandler }) => (
  <StyledModeSelect>
    <span className="selectText">Mode:</span>
    <select className="selectDropdown" onChange={setModeHandler}>
      <option>Easy</option>
      <option>Medium</option>
      <option>Hard</option>
    </select>
  </StyledModeSelect>
);

export default ModeSelect;
