import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createStage, checkCollision } from "../ast/gameHelper";

// COMPONENTS
import Stage from "./Stage";
import Display from "./Display";
import StartBtn from "./StartBtn";
import ModeSelect from "./ModeSelect";

// HOOKS
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useGameStatus } from "../hooks/useGame";

// STYLED COMPONENTS
const StyledTetrisWrapper = styled.div`
  // display: flex;
  // justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const StyledTetris = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 40px;
  max-width: 900px;
  margin: 0 auto;
  // flex-shrink: 0;
  // flex: 1 0 auto;
  // width: 100%;

  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;
  }
`;

const Tetris = () => {
  const modeDropTime = { Easy: 1000, Medium: 900, Hard: 800 };
  const nextDropTime = { Easy: 0.9, Medium: 0.8, Hard: 0.75 };
  let baseDropTime;

  const [dropTime, setDropTime] = useState(null);
  const [initSpeed, setinitSpeed] = useState(null);
  const [nextSpeed, setNextSpeed] = useState(null);
  const [mode, setMode] = useState("Easy");
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  const setModeHandler = evt => {
    setMode(evt.target.value);
  };

  // console.log("mode --", mode);

  const startGame = () => {
    setStage(createStage());
    setinitSpeed(modeDropTime[mode]);
    // setDropTime(initSpeed);
    setNextSpeed(nextDropTime[mode]);
    resetPlayer();
    setScore(0);
    setRows(0);
    setLevel(1);
    setGameOver(false);
  };

  useEffect(() => {
    console.log("EFFECT -", initSpeed);
    setDropTime(initSpeed);
  }, [initSpeed]);

  const moveHorizontal = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const drop = () => {
    console.log("drop -", player, stage);
    if (rows > level * 10) {
      setLevel(prev => prev + 1);
      setDropTime(initSpeed * nextSpeed ** (level - 1));
    }
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        console.log("Game Over!");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const moveDown = () => {
    setDropTime(null);
    drop();
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver && keyCode === 40)
      setDropTime(initSpeed * nextSpeed ** (level - 1));
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) moveHorizontal(-1);
      else if (keyCode === 38) playerRotate(stage, 1);
      else if (keyCode === 39) moveHorizontal(1);
      else if (keyCode === 40) moveDown();
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  console.log("render -", mode, initSpeed, dropTime, nextSpeed);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />

        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <ModeSelect setModeHandler={setModeHandler} />
          <StartBtn startGame={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
