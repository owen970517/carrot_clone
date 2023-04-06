import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { auth } from "../../firebase";
import {useDispatch , useSelector} from 'react-redux'
import { userActions } from "../../store/userSlice";
import SearchBar from "./SearchBar";
import { RootState } from "../../store/store";
import { useCallback, useState } from "react";
import { IStyleProps } from '../../type/StyleProps';
import Hamburger from '../../ImgSrc/Hamburger_icon.svg'
import times from '../../ImgSrc/times.svg'
const Header = () => {
  const [isopen, setIsOpen] = useState(false);
  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const dispatch = useDispatch();
  const {isLogin,profileImg,user} = useSelector((state:RootState) => state.user);
  const defaultImg = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  const nav = useNavigate();
  const onLogOut = useCallback(async () => {
    setIsOpen((prev) => !prev);
    dispatch(userActions.logout());
    await auth.signOut();
    nav('/sign');
  },[dispatch, nav])
    return (
      <Nav>
        <h1>Logo</h1>
        <UL isopen={isopen }>
          <SearchBar/>
          <LI>{isLogin ? 
          <Div>
            <ProfileDiv>
              <ProfileImg src={profileImg ? profileImg : defaultImg } alt='' ></ProfileImg>
            </ProfileDiv>
            <StyledLink to='/profile' onClick={handleToggleOpen}>{user.displayName}</StyledLink>
          </Div> : ""}</LI>
          <LI><StyledLink to='/' onClick={handleToggleOpen}>중고거래</StyledLink></LI>
          <LI><StyledLink to='/write' onClick={handleToggleOpen}>글쓰기</StyledLink></LI>
          {isLogin && <LI><StyledLink to='/cart' onClick={handleToggleOpen}>장바구니</StyledLink></LI> }
          {isLogin ? <Btn onClick={onLogOut}>로그아웃</Btn> : <LI><StyledLink to='/sign' onClick={handleToggleOpen}>회원가입</StyledLink></LI> }
        </UL>
        { isopen ?  <img src={times} className="ham" onClick={handleToggleOpen} alt='asdsa' style={{width :'40px', height : '40px'}}/> : <img className="ham" src={Hamburger} alt='햄버거' onClick={handleToggleOpen}/>}
      </Nav>
    )
}

const Nav = styled.div`
  background-color: #74c0fc;
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  .ham {
    display: none;
    color: white;
    font-size: 24px;
    position: absolute;
    right: 20px;
    top: 45px;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    .ham {
      display : block;
    }
  }
`
const UL = styled.ul`
  display:flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: ${(props:IStyleProps) => (props.isopen ? "flex" : "none")};
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`
const LI =  styled.li`
  font-size : 20px;
  list-style : none;
  display: block;
  @media screen and (max-width: 768px) {
    margin-bottom: 10px;
    &:hover {
      cursor: pointer;
      background: #44a8f4;
      border-radius: 10px;
    }
  }
`
const Btn = styled.button `
  
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color : white;
  display: block;
  padding: 10px;
`
const ProfileDiv = styled.div`
  width : 50px;
  height : 50px;
  border-radius: 50%;
  overflow:hidden;
`
const ProfileImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;

`
const Div = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
`



export default Header