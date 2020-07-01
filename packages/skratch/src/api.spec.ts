import { api } from './api'

describe('api', () => {
  it('template liternal function should return a Node', () => {
    expect(
      api
    ).toBeInstanceOf(Object)
  })
})