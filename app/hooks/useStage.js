import { useState, useEffect } from "react";
import { createStage } from "../ast/gameHelper";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = newStage =>
      newStage.reduce((acm, row) => {
        if (row.findIndex(cell => cell[0] === 0) === -1) {
          setRowsCleared(prev => prev + 1);
          acm.unshift(new Array(newStage[0].length).fill([0, "clear"]));
        } else acm.push(row);
        return acm;
      }, []);

    const updateStage = prevStage => {
      const newStage = prevStage.map(row =>
        row.map(cell => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      player.tetromino.forEach((row, y) => {
        row.forEach((val, x) => {
          if (val !== 0) {
            // console.log("stage -", newStage, y, player.pos.y, x, player.pos.x);
            newStage[y + player.pos.y][x + player.pos.x] = [
              val,
              `${player.collided ? "merged" : "clear"}`
            ];
          }
        });
      });

      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }

      return newStage;
    };

    setStage(prev => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage, rowsCleared];
};
