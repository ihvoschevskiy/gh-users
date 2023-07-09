import '@testing-library/jest-dom'

const filteredWarnMessages: string[] = ['async-validator:']
const privateWarnLog = console.warn

jest.spyOn(console, 'warn').mockImplementation((msg: string, ...args: unknown[]) => {
  filteredWarnMessages.some(message => msg.includes(message)) ? jest.fn() : privateWarnLog(msg, ...args)
})

const filteredErrorMessages: string[] = ['a test was not wrapped in act']
const privateErrorLog = console.error

jest.spyOn(console, 'error').mockImplementation((msg: string, ...args: unknown[]) => {
  filteredErrorMessages.some(message => msg.includes(message)) ? jest.fn() : privateErrorLog(msg, ...args)
})

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
})
