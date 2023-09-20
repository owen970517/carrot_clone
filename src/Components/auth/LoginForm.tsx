import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { auth } from '../../firebase';
import { IForm } from '../../type/InputForm';
import { IProps } from '../../type/StateProps';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/userSlice';

const LoginForm = ({setLogin}:IProps) => {
    const dispatch = useDispatch();
    const {register , handleSubmit  } = useForm<IForm>();
    const nav = useNavigate();
    const onLoginSubmit: SubmitHandler<IForm> = async (data) => {
      try {
        const result = await auth.signInWithEmailAndPassword(data.mail, data.password);
        dispatch(userActions.setIsLogin(true));
        dispatch(userActions.login({
          displayName : result.user?.displayName,
          uid : result.user?.uid
        }))
        nav('/');
      } catch (error) {
        alert('아이디 또는 비밀번호가 틀렸습니다.');
      } 
    };
    return (
      <Form onSubmit={handleSubmit(onLoginSubmit)}>
          <h1>로그인</h1>
          <Input {...register('mail' , {required :true })} type='email' placeholder="이메일"></Input>
          <Input {...register('password' , {required :true , minLength : 6})} type='password' placeholder="비밀번호"></Input>
          <Btn type='submit'>로그인</Btn>
          <button type='button' onClick={() => setLogin((prev) => !prev)}>회원가입</button>
      </Form>
  )
}
const Form = styled.form`
    display: flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
`
const Input = styled.input`
    width : 500px;
    height : 50px;
    margin : 10px 10px;
`

const Btn = styled.button`
  width : 300px;
  height : 50px;
  margin-bottom : 10px;
`
export default LoginForm

