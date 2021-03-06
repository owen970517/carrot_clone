import { useForm } from "react-hook-form"
import { auth, db } from "../firebase";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sign() {
    const {register , handleSubmit  } = useForm();
    const [login , setLogin] = useState(false);
    const nav = useNavigate();
    const onSubmit = (props) => {
        console.log(props.mail);
        console.log(props.password);
        auth.createUserWithEmailAndPassword(props.mail,props.password).then((result) => {
            db.collection('user').doc(result.user.uid).set({
                name : props.name,
                email : props.mail
            })
            console.log(result.user);
            result.user.updateProfile({displayName : props.name})
        })
    }
    const onLoginSubmit = (props) => {
        auth.signInWithEmailAndPassword(props.mail , props.password).then((result)=> {
            console.log(result.user)
        })
    }
    const onChangeBtn = () => {
        setLogin((prev) => !prev)
    }
    auth.onAuthStateChanged((user)=>{
        if (user) {
            console.log(user)
            nav('/');
        }
      })
    return (
        <div>
            {login ?   
            <Form onSubmit={handleSubmit(onLoginSubmit)}>
                <h1>로그인</h1>
                <Input {...register('mail' , {required :true })} type='email' placeholder="이메일"></Input>
                <Input {...register('password' , {required :true , maxLength : 10})} type='password' placeholder="비밀번호"></Input>
                <Btn type='submit'></Btn>
                <button onClick={onChangeBtn}>회원가입</button>
            </Form> :
            <Form onSubmit={handleSubmit(onSubmit)}>
                    <h1>회원가입</h1>
                    <Input {...register('name' , {required :true , maxLength : 10})} type='text' placeholder="닉네임"></Input>
                    <Input {...register('mail' , {required :true })} type='email' placeholder="이메일"></Input>
                    <Input {...register('password' , {required :true , maxLength : 10})} type='password' placeholder="비밀번호"></Input>
                    <Btn type='submit'></Btn>
                    <button onClick={onChangeBtn}>로그인</button>
            </Form>
            }   
        </div>
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

const Btn = styled.input`
    width : 300px;
    height : 50px;
    margin-bottom : 10px;
`
export default Sign;