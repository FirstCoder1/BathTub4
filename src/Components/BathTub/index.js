import { useState, useRef } from "react";
import PropTypes from "prop-types";

import { makeStyles, Button, Typography } from "@material-ui/core";
import {
  ArrowUpward as UpIcon,
  ArrowDownward as DownIcon,
} from "@material-ui/icons";

import {
  MIN_WATER_LEVLE,
  MAX_WATER_LEVLE,
  UPDATE_INTERVAL,
  LEVEL_HEIGHT,
  BATH_WIDTH,
  BATH_COLCOR,
  WATER_COLOR,
  COUNTER_FONT_SIZE,
  COUNTER_FONT_COLOR,
  BUTTON_FONT_SIZE,
  BUTTON_BACKGROUND_COLOR,
  BUTTON_HOVER_COLOR,
} from "./constants";

const useStyles = makeStyles({
  container: ({ width }) => ({
    display: "flex",
    flexDirection: "column",
    width: width,
    minWidth: `${width}px`,
    padding: "10px 10px 0",
  }),
  counter: ({ counterFontSize, counterFontColor }) => ({
    fontSize: counterFontSize,
    fontWeight: 400,
    color: counterFontColor,
  }),
  bathtub: ({ height, bathColor }) => ({
    display: "flex",
    width: "100%",
    height: `${height}px`,
    alignItems: "flex-end",
    background: bathColor,
    borderRadius: "4px",
  }),
  bathtubContent: ({ waterColor }) => ({
    width: "100%",
    background: waterColor,
    borderRadius: "4px",
  }),
  footer: {
    display: "flex",
    height: "60px",
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: ({ buttonBackgroundColor, buttonHoverColor, buttonFontSize }) => ({
    backgroundColor: buttonBackgroundColor,
    marginBottom: "16px",
    fontSize: `${buttonFontSize}px`,
    "&:hover": { backgroundColor: `${buttonHoverColor} !important` },
  }),
});

function BathTub({
  width,
  bathColor,
  waterColor,
  counterFontSize,
  counterFontColor,
  buttonBackgroundColor,
  buttonHoverColor,
  buttonFontSize,
}) {
  const classes = useStyles({
    width,
    bathColor,
    waterColor,
    counterFontSize,
    counterFontColor,
    buttonBackgroundColor,
    buttonHoverColor,
    buttonFontSize,
    height: LEVEL_HEIGHT * MAX_WATER_LEVLE,
  });
  const [level, setLevel] = useState(MIN_WATER_LEVLE);
  const levelRef = useRef(MIN_WATER_LEVLE);
  const [increaseTimer, setIncreaseTimer] = useState(null);
  const [decreaseTimer, setDecreaseTimer] = useState(null);

  const increaseLevel = () => {
    if (levelRef.current < MAX_WATER_LEVLE) {
      if (levelRef.current < MAX_WATER_LEVLE - 1) handleClickIncrease();
      else {
        clearTimeout(increaseTimer);
        setIncreaseTimer(null);
      }
      levelRef.current = levelRef.current + 1;
      setLevel(levelRef.current);
    }
  };

  const decreaseLevel = () => {
    if (levelRef.current > MIN_WATER_LEVLE) {
      if (levelRef.current > MIN_WATER_LEVLE + 1) handleClickDecrease();
      else {
        clearTimeout(decreaseTimer);
        setDecreaseTimer(null);
      }
      levelRef.current = levelRef.current - 1;
      setLevel(levelRef.current);
    }
  };

  const handleClickIncrease = () => {
    if (decreaseTimer) {
      clearTimeout(decreaseTimer);
      setDecreaseTimer(null);
    }

    const increaseLevelTimer = setTimeout(increaseLevel, UPDATE_INTERVAL);
    setIncreaseTimer(increaseLevelTimer);
  };

  const handleClickDecrease = () => {
    if (increaseTimer) {
      clearTimeout(increaseTimer);
      setIncreaseTimer(null);
    }

    const decreaseLevelTimer = setTimeout(decreaseLevel, UPDATE_INTERVAL);
    setDecreaseTimer(decreaseLevelTimer);
  };

  return (
    <div className={classes.container}>
      <Typography className={classes.counter}>
        {`Water Level: ${(level * 100) / MAX_WATER_LEVLE}%`}
      </Typography>
      <div className={classes.bathtub}>
        <div
          className={classes.bathtubContent}
          style={{
            height: `${level * LEVEL_HEIGHT}px`,
            borderRadius: level === MAX_WATER_LEVLE ? "4px" : "0 0 4px 4px",
          }}
        />
      </div>
      <div className={classes.footer}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<UpIcon />}
          className={classes.button}
          onClick={handleClickIncrease}
        >
          Increase
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DownIcon />}
          className={classes.button}
          onClick={handleClickDecrease}
        >
          Decrease
        </Button>
      </div>
    </div>
  );
}

BathTub.propTypes = {
  width: PropTypes.number.isRequired,
  bathColor: PropTypes.string.isRequired,
  waterColor: PropTypes.string.isRequired,
  counterFontSize: PropTypes.number.isRequired,
  counterFontColor: PropTypes.string.isRequired,
  buttonFontSize: PropTypes.number.isRequired,
  buttonBackgroundColor: PropTypes.string.isRequired,
  buttonHoverColor: PropTypes.string.isRequired,
};

BathTub.defaultProps = {
  width: BATH_WIDTH,
  bathColor: BATH_COLCOR,
  waterColor: WATER_COLOR,
  counterFontSize: COUNTER_FONT_SIZE,
  counterFontColor: COUNTER_FONT_COLOR,
  buttonFontSize: BUTTON_FONT_SIZE,
  buttonBackgroundColor: BUTTON_BACKGROUND_COLOR,
  buttonHoverColor: BUTTON_HOVER_COLOR,
};

export default BathTub;
