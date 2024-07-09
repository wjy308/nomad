export const getStaticProps = async () => ({
  props: {
    layoutType: 'removeFooter',
  },
});

function Index() {
  return <main>예약현황</main>;
}

export default Index;
