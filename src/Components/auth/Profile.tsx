import { useState,useRef } from "react"
import { auth, db, storage } from "../../firebase";
import { useNavigate} from "react-router-dom"
import styled from "styled-components";
import { useDispatch, useSelector} from 'react-redux'
import SaleProducts from "../products/SaleProducts";
import SoldProducts from "../products/SoldProducts";
import { RootState } from "../../store/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { IForm } from "../../type/InputForm";
import { userActions } from "../../store/userSlice";
function Profile() {
    const {register,handleSubmit} = useForm<IForm>()
    const dispatch = useDispatch();
    const userObj = useSelector((state:any) => state.user.user)
    const profileImg = useSelector((state:RootState) => state.user.profileImg);
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [userNickName , setUserNickName] = useState(userObj.displayName);
    const [sale , setSale] = useState(true);
    const nav = useNavigate();
    const onFormSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        auth?.currentUser?.updateProfile({
            displayName : userNickName ,    
        })
        nav('/');
    }
    const onNickname = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUserNickName(e.target.value);
    }
    const onSubmit:SubmitHandler<IForm> = (props) => {
        if(props.image[0]) {
            const Img = props.image[0];
            const storageRef = storage.ref();
            const ImgRef = storageRef.child(`image/${Img.name}`);
            const uploadImg = ImgRef.put(Img);
            uploadImg.on('state_changed', 
            // 변화시 동작하는 함수 
            null, 
            //에러시 동작하는 함수
            (error) => {
              console.error('실패사유는', error);
            }, 
            // 성공시 동작하는 함수
            async () => {
              await uploadImg.snapshot.ref.getDownloadURL().then((url) => {
                console.log('업로드된 경로는', url);
                auth.currentUser?.updateProfile({
                    photoURL : url
                    })
                dispatch(userActions.addProfileImg(url))
                });
              });
            }
        nav('/');
    }
    
    const defaultImg = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    return (
        <div>
            <Title>프로필</Title>
            <ProfileDiv>
                <ProfileImg src={profileImg ? profileImg : defaultImg}></ProfileImg>
            </ProfileDiv>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FileInput onClick={() => {fileRef.current?.click()}}>
                    <label>업로드</label>
                    <input {...register('image')} type="file" ref={(data) => {
                        register('image').ref(data);
                        fileRef.current = data
                    }}></input>
                </FileInput>
            </Form>
            <UserForm onSubmit={onFormSubmit}>
                닉네임 : <input type='text' onChange={onNickname} value={userNickName}/>
                <button type="submit">수정</button>
            </UserForm>
            <div>
                <Btn>
                    <button onClick={() => setSale((prev) => !prev)}>판매중</button>
                    <button onClick={() => setSale((prev) => !prev)}>판매완료</button>
                </Btn>
                {sale ?
                    <>
                        <Title>판매중</Title>
                        <SaleProducts userNickName={userNickName}/>
                    </>
                    :  
                    <>
                        <Title>판매완료</Title>
                        <SoldProducts userNickName={userNickName}/>
                    </>
                }
            </div>
        </div>
    )
}

const UserForm = styled.form`
  display : flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`

const Title = styled.h1`
    text-align: center;

`
const Btn = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`
const ProfileDiv = styled.div`
  width : 300px;
  height : 300px;
  border-radius: 50%;
  overflow:hidden;
`
const ProfileImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const FileInput = styled.div`
  label {
    display: inline-block;
    padding: .5em .75em;
    color: #fff;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
    background-color: #337ab7;
    border-color: #2e6da4;
    border-bottom-color: #e2e2e2;
    border-radius: .25em;
  }
  input[type='file'] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip:rect(0,0,0,0);
    border: 0;
  }
`
export default Profile