import axios from 'axios'

export enum LogType {
  ERROR = 'error',
  DEBUG = 'debug',
  WARN = 'warn',
  INFO = 'info',
  LOG = 'log',
}

window.onerror = function (msg, source, lineNo, columnNo, error) {
  logError(`message: ${msg} @ ${source}:${lineNo}:${columnNo} ${error}`)
};

(function () {
  const log = console.log
  const error = console.error
  // const warn = console.warn
  // const info = console.info
  // const debug = console.debug

  console.log = function () {
    logMessage(JSON.stringify(arguments), LogType.LOG)
    log.apply(this, Array.prototype.slice.call(arguments))
  }

  console.error = function () {
    logError(arguments)
    error.apply(this, Array.prototype.slice.call(arguments))
  }
}())

export const logError = async (error: unknown) => {
  await logMessage(JSON.stringify(error), LogType.ERROR)
}

export const logMessage = async (message: string, type: LogType) => {
  await axios.post('/latest/log', { message, type })
}
