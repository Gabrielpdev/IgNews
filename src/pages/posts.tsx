import Head from 'next/head';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ig.News</title>
      </Head>
      <h2>POST</h2>
      
    </>
  )
}

// export const getStaticProps:GetStaticProps = async () => {
//   const price = await stripe.prices.retrieve('price_1IYf8THUIjk1ttwust8IOGxt')

//   const product = {
//     priceId: price.id,
//     amount: new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD'
//     }).format(price.unit_amount / 100),
//   }

//   const ondeDay = 60 * 60 * 24;

//   return {
//     props: {
//       product
//     },
//     revalidate: ondeDay
//   }
// }
