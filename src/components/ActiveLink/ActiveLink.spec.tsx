import { render } from '@testing-library/react';

import { ActiveLink } from '.';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

describe("ActiveLink component", () => {
  it("should be able to render 'Home'", () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active" >
        <a>Home</a>
      </ActiveLink>
    )
  
    expect(getByText('Home')).toBeInTheDocument()
  })
  
  it("adds active if the link as currently active", () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active" >
        <a>Home</a>
      </ActiveLink>
    )
  
    expect(getByText('Home')).toHaveClass('active')
  })
})
