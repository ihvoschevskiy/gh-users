const log = require('npmlog')

Object.defineProperty(log, 'heading', {
  get: () => {
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' }
    return new Date().toLocaleDateString('ru-Ru', options).replace(',', '')
  },
})

log.disp.info = ' INFO '
log.style.info.bold = true
log.style.info.fg = 'blue'

log.disp.warn = ' WARN '
log.style.warn.bold = true
log.style.warn.fg = 'yellow'
log.style.warn.bg = ''

log.disp.error = ' ERRO '
log.style.error.bold = true

log.headingStyle.fg = 'grey'
log.prefixStyle.fg = 'white'

module.exports = log
