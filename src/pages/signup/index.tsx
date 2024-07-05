export const getStaticProps = async () => ({
  props: {
    layoutType: 'removeLayout',
  },
});

function SignUp() {
  return <div>회원가입 페이지</div>;
}

export default SignUp;
