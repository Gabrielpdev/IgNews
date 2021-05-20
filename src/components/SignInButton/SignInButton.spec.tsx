import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils'
import { useSession } from 'next-auth/client';
import { SignInButton } from '.';

jest.mock('next-auth/client')

describe("SignInButton component", () => {
  it("should be able to render when user is not authenticated", () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(
      <SignInButton />
    )
  
    expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
  })

  it("should be able to render when user is authenticated", () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([
      { user: 
        { 
          name: 'John Doe', 
          email: 'jonh.doe@email.com' 
        }, expires: 'fake-expires'
      }, true
    ])

    render(
      <SignInButton />
    )
  
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})
