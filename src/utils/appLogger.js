const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const colors = require("colors");

function appLogger(moduleName) {
  const { errors, timestamp, label, combine, printf } = winston.format;

  const getTransports = () => {
    const devEnv = process.env.NODE_ENV !== "production";

    const logLevelColors = {
      silly: "rainbow",
      input: "grey",
      verbose: "cyan",
      prompt: "grey",
      info: "green",
      data: "grey",
      help: "cyan",
      warn: "yellow",
      debug: "blue",
      error: "red",
    };

    const consoleFormat = printf(
      ({ level, label, timestamp, stack, message }) => {
        return colors[logLevelColors[level]](
          `[${timestamp}] ${label}.${level}: ${stack ? stack : message}`
        );
      }
    );

    const fileFormat = printf(
      ({ level, label, timestamp, stack, message }) =>
        `[${timestamp}] ${label}.${level}: ${stack ? stack : message}`
    );

    const fileTransport = new DailyRotateFile({
      filename: "logs/app-%DATE%.log",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      format: fileFormat,
    });

    const consoleTransport = new winston.transports.Console({
      format: consoleFormat,
    });

    return devEnv ? consoleTransport : fileTransport;
  };

  return winston.createLogger({
    level: "debug",
    transports: [getTransports()],
    format: combine(
      errors({ stack: true }),
      timestamp({ format: "YYYY-MM-DD hh:mm:ss a" }),
      label({ label: moduleName })
    ),
  });
}

module.exports = appLogger;
