import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';

import { Async } from '.';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    } 
  }
})

describe("Async component",  () => {
  it("should be able to render 'Async'", async () => {
    render(<Async />)
  
    expect(screen.getByText('Hello world')).toBeInTheDocument()

    // expect( await screen.findByText('Button')).toBeInTheDocument()

    await waitForElementToBeRemoved(screen.queryByText('Disable'))

    await waitFor(() => {
      return expect(screen.getByText('Button')).toBeInTheDocument()
    })
  })
})
