const LoggerCfg = {
  render: { bg: 'white', color: 'black' },
  event: { bg: 'lime', color: 'black' },
  notify: { bg: 'gray', color: 'blue' },
  cdm: { bg: 'green', color: 'white', fSize: 15, borderColor: 'black', marginLeft: 10 },
};

const log = ({ msg, type, fSize = 20, borderColor = 'red', marginLeft = 0 }, ...rest) => {
  const loggerOptions = LoggerCfg[type];
  console.log(
    `%c ${msg}`,
    `font-size: ${loggerOptions.fSize || fSize}px; background: ${loggerOptions.bg}; color: ${
      loggerOptions.color
    }; border: 2px solid ${loggerOptions.borderColor ||
      borderColor}; margin-left: ${loggerOptions.marginLeft || marginLeft}px;`,
    ...rest
  );
};

export default log;
