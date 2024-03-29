import { lazy} from "react"
import { Route, Routes } from "react-router-dom"
import { ROUTES } from "../constants/routes"

const Home = lazy(() =>import('./Home'))
const Profile = lazy(() => import("./Profile"))
const AddProduct = lazy(() => import('./AddProduct'))
const Detail = lazy(() => import('./Detail'))
const Sign = lazy(() => import("./AuthContainer"))
const ModifyProduct = lazy(() => import("./ModifyProduct"))
const InterestList = lazy(() => import("./InterestList"))
const Chat = lazy(() => import("./Chat"))
const ChatRooms = lazy(() => import("./ChatRooms"))

const Pages = () => {
  return ( 
    <Routes>
      <Route path={ROUTES.HOME} element={<Home/>} />
      <Route path={ROUTES.WRITE} element={<AddProduct />} />
      <Route path={ROUTES.PROFILE} element={<Profile/>} />
      <Route path={ROUTES.DETAIL} element={<Detail />} />
      <Route path={ROUTES.SIGN} element={<Sign/>} />
      <Route path={ROUTES.CHATROOMS} element={<ChatRooms/>}/>
      <Route path={ROUTES.CHAT_PRODUCT} element={<Chat/>}/>
      <Route path={ROUTES.MODIFY_UID }element={<ModifyProduct/>}/>
      <Route path={ROUTES.CART}element={<InterestList />}/>
    </Routes>
  )
}

export default Pages