import { useCallback, useEffect, useState}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { RootState } from '../../store/store'
import { IData } from '../../type/ItemProps'
import noImg from '../../ImgSrc/noimage.jpg'
import { db } from '../../firebase'
import { regionActions } from '../../store/regionSlice'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useInView } from "react-intersection-observer"
import React from 'react'

const AllProducts = () => {
  const [isLoading , setIsLoading] = useState(false);
  const [nowIndex , setNowIndex] = useState(0);
  const [ref,inView] = useInView({
    /* Optional options */
    threshold: 0.5,
  });
  const dispatch = useDispatch();
  const {filteredData,remainData,data} = useSelector((state:RootState) =>state.region)
  useEffect(() => {
    db.collection('Product').where('상태' , '==' , '판매중').orderBy('날짜','desc').onSnapshot((snapshot) => {
    const itemList = snapshot.docs.map((doc) =>({
      id : doc.id,
      ...doc.data()
    }))
    dispatch(regionActions.setData(itemList));
    })
  },[dispatch]); 
  const getMoreProduct = useCallback(async () => {
    setIsLoading(true);
    dispatch(regionActions.getMoreDataList(data.slice(nowIndex,nowIndex+10)))
    setIsLoading(false);
  },[data, dispatch, nowIndex])
  useEffect(() => {
    if(!inView ) return
    if (nowIndex > 0) {
      getMoreProduct()
    }
    if (inView && !isLoading && nowIndex < data.length ) {
      setNowIndex(prev => prev + 10)
    }
  },[data.length, getMoreProduct, inView, isLoading, nowIndex])
  console.log(remainData);
  return (
    <>
      <Grid>
        {filteredData.map((p:IData,idx:number) => {
          return (
            <React.Fragment key={p.id}>
              {filteredData.length -1 === idx ? <Item>
                <LazyLoadImage src={p.이미지 ? p.이미지 : noImg} alt='이미지를 불러오지 못했습니다.' width={300} height={300} effect='blur'/>
                <div ref={ref}>
                  <StyledLink to={`/detail/${p.id}`}><h3>{p.상품명}</h3></StyledLink>
                  <h3>{p.날짜}</h3>
                  <h3>{p.지역}</h3>
                  <h3>{p.가격?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h3>
                </div>
              </Item> : <Item key={p.id} >
                <LazyLoadImage src={p.이미지 ? p.이미지 : noImg} alt='이미지를 불러오지 못했습니다.' width={300} height={300} effect='blur'/>
                <div>
                  <StyledLink to={`/detail/${p.id}`}><h3>{p.상품명}</h3></StyledLink>
                  <h3>{p.날짜}</h3>
                  <h3>{p.지역}</h3>
                  <h3>{p.가격?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h3>
                </div>
              </Item>}
            </React.Fragment>
          )
        })}
      </Grid>
    </>
  )
}
const Grid = styled.div`
    display : grid;
    grid-template-columns : repeat(auto-fit , minmax(20rem,1fr));
    grid-gap : 10px;
    place-items: center;
`;

const Item = styled.div`
  display : flex;
  flex-direction: column;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color : black;
`
export default AllProducts