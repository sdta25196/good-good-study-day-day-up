export async function getStaticPaths() {
  const paths = ['1', '2'].map((product) => ({
    params: { id: product },
  }));

  return { paths, fallback: 'blocking' };
}


export async function getStaticProps({ params }) {
  let data = await new Promise(res => {
    setTimeout(() => {
      res(params.id)
    }, 2000)
  });
  return {
    props: { data }, // will be passed to the page component as props
  }
}

function X({ data }) {
  return (
    <div>
      sadasdasdasd{data}
    </div>
  )
}

export default X