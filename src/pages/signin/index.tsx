export const getStaticProps = async () => ({
  props: {
    layoutType: 'removeLayout',
  },
});

function SignIn() {
  return <div>로그인 페이지</div>;
}

export default SignIn;
