import { useCallback, useEffect, useMemo, useState}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { IData } from '../../type/ItemProps'
import noImg from '../../ImgSrc/noimage.jpg'
import { db } from '../../firebase'
import { regionActions } from '../../store/regionSlice'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useInView } from "react-intersection-observer"
import SkeletonUI from '../Layout/SkeletonUI'
import { RootState } from '../../store/store'

const AllProducts = () => {
  const [isLoading , setIsLoading] = useState(false);
  const [nowIndex , setNowIndex] = useState(0);
  const [ref,inView] = useInView({
    /* Optional options */
    threshold: 0.5,
  });
  const dispatch = useDispatch();
  const {filteredData,data} = useSelector((state:RootState) =>state.region)
  
  const memoizedDispatch = useCallback((itemList:IData[]) => {
    dispatch(regionActions.setData(itemList));
  }, [dispatch]);
  
  const getMoreProduct = useCallback(() => {
    setIsLoading(true);
    dispatch(regionActions.getMoreDataList(data.slice(nowIndex,nowIndex+10)))
  }, [dispatch, nowIndex]);
  
  useEffect(() => {
    db.collection('Product').where('상태' , '==' , '판매중').orderBy('날짜','desc').onSnapshot((snapshot) => {
      const itemList = snapshot.docs.map((doc) =>({
        id : doc.id,
        ...doc.data()
      }));
      memoizedDispatch(itemList);
    });
  }, [memoizedDispatch]);
  
  useEffect(() => {
    if (!inView || nowIndex === 0 || isLoading || nowIndex >= data.length) return;
    getMoreProduct();
  }, [inView, nowIndex, isLoading, data.length, getMoreProduct]);
  
  useEffect(() => {
    if (!inView || isLoading || nowIndex >= data.length) return;
    setNowIndex(prevIndex => prevIndex + 10);
  }, [inView, isLoading, data.length, nowIndex]);
  
  useEffect(() => {
    if (isLoading && inView) {
      setIsLoading(false);
    }
  }, [isLoading, inView]);
  const defaultItems = useMemo(() => Array.from({ length: 10 }, (_, i) => <SkeletonUI key={i} />), []);
  return (
    <>
      <Grid>
        {filteredData.length > 0 ? filteredData.map((p: IData, idx: number) => {
          return (
            <Item key={p.id}>
              <LazyLoadImage src={p.이미지 ? p.이미지 : noImg} alt='이미지를 불러오지 못했습니다.' width={300} height={300} effect='blur' />
              <div ref={idx === filteredData.length - 1 ? ref : undefined}>
                <StyledLink to={`/detail/${p.id}`}><h3>{p.상품명}</h3></StyledLink>
                <h3>{p.날짜}</h3>
                <h3>{p.지역}</h3>
                <h3>{p.가격?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h3>
              </div>
            </Item>
          )
        }) : defaultItems}
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