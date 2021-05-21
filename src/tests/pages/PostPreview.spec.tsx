import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { getSession, useSession } from 'next-auth/client';
import { getPrismicClient } from '../../services/prismic'

import PostPreview, { getStaticProps } from '../../pages/posts/preview/[slug]';
import { useRouter } from 'next/router';

const posts = { 
  slug: 'my-new-post', 
  title: 'my new post', 
  content: '<p>post excerpt</p>', 
  updatedAt: '10 de abril'
}

jest.mock('next-auth/client')
jest.mock('next/router')
jest.mock('../../services/prismic')

describe('PostPreview page', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<PostPreview post={posts} />)

    expect(screen.getByText('my new post')).toBeInTheDocument()
    expect(screen.getByText('post excerpt')).toBeInTheDocument()
    expect(screen.getByText('Wanna continue reading ?')).toBeInTheDocument()
  });

  it('redirects user to full post when user is subscribed', async () => {
    // const getPrismiscClientMocked = mocked(getPrismicClient)
    const useSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce([
      { activeSubscription: 'fake-active-subscription'},
      false
    ] as any)

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any)
    
    render(<PostPreview post={posts} />)

    expect(pushMock).toHaveBeenCalledWith('/post/my-new-post')
  })

  it('load initial data', async () => {
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
    
    const response = await getStaticProps({ params: { slug: 'my-new-post' }})

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