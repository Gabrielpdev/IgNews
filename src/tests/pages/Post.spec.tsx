import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { getSession } from 'next-auth/client';
import { getPrismicClient } from '../../services/prismic'

import Post, { getServerSideProps } from '../../pages/posts/[slug]';

const posts = { 
  slug: 'my-new-post', 
  title: 'my new post', 
  content: '<p>post excerpt</p>', 
  updatedAt: '10 de abril'
}


jest.mock('next-auth/client')
jest.mock('../../services/prismic')

describe('Post page', () => {
  it('renders correctly', () => {
    render(<Post post={posts} />)

    expect(screen.getByText('my new post')).toBeInTheDocument()
  });

  it('redirects user if no subscription is found', async () => {
    // const getPrismiscClientMocked = mocked(getPrismicClient)
    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockResolvedValueOnce(null)
    
    const response = await getServerSideProps({ params: { slug: 'my-new-post' }} as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/posts/preview/my-new-post',
        })
      })
    )
  })

  it('redirects user if no subscription is found', async () => {
    const getPrismiscClientMocked = mocked(getPrismicClient)
    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription'
    } as any);

    getPrismiscClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        uid: 'my-new-post',
        data: {
          title: [
            { type: 'heading', text: 'my new post'}
          ],
          content: [
            { type: 'paragraph', text: 'post excerpt'}
          ],
        },
        last_publication_date: '04-01-2021'
      })
    } as any)
    
    const response = await getServerSideProps({ params: { slug: 'my-new-post' }} as any)

    expect(response).toEqual(
      expect.objectContaining({
        props: expect.objectContaining({
          post: {
            slug: 'my-new-post',
            title: 'my new post',
            content: '<p>post excerpt</p>',
            updatedAt: '01 de abril de 2021'
          }
        })
      })
    )
  })
})