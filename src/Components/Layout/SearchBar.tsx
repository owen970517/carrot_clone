import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IForm } from '../../type/InputForm';
import styled from 'styled-components';
import { BiSearch } from "react-icons/bi";

interface IProps {
    isopen :boolean
}

const SearchBar = () => {
    const [isOpen , setIsOpen] = useState(false);
    const nav = useNavigate();
    const {register , handleSubmit , setValue, setFocus } = useForm<IForm>();
    const onSearch = handleSubmit((e) => {
        nav('/search/' + e.search)
        setIsOpen(false);
        setValue('search' , '')
    })
    const toggleSearch = () => {
        setIsOpen(true);
        setFocus('search');
    }
  return (
    <SearchForm isopen={isOpen} onSubmit={onSearch} onClick={toggleSearch}>
        <SearchIcon/>
        <SearchInput {...register("search" , {required : true})} placeholder='찾고 싶은 상품을 입력하시오' isopen={isOpen}/>
    </SearchForm>
  )
}
const SearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #37474f;
  /* Change width of the form depending if the bar is opened or not */
  width: ${(props:IProps) => (props.isopen ? "30rem" : "2rem")};
  /* If bar opened, normal cursor on the whole form. If closed, show pointer on the whole form so user knows he can click to open it */
  cursor: ${(props:IProps)=> (props.isopen ? "auto" : "pointer")};
  padding: 10px;
  height: 20px;
  border-radius: 40px;
  transition: width 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
`
const SearchInput = styled.input`
  font-size: 20px;
  line-height: 1;
  background-color: transparent;
  width: 100%;
  border: none;
  color: white;
  display : ${(props:IProps) => props.isopen ? 'block' : 'none'};
  transition: margin 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
`
const SearchIcon =styled(BiSearch)`
  line-height: 1;
  font-size :40px;
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
  cursor : pointer;
`
export default SearchBar