import { useEffect, useState } from "react";
import "./containerStyles.css";
import ProfilePost, { ProfilePostType } from "./ProfilePost";
import './NavBar.css';
import { Link, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { logoutReducer, userIdReducer } from "../features/LogInSlice";
import { familyIdReducer } from "../features/FamilySlice";

function Profilepage() {
    const dispatch = useDispatch()
    const loginState = useSelector((store:RootState) => store.login.isLoggedIn)
    const userIdState = useSelector((store:RootState) => store.login.userId)
    const [firstname, setFname] = useState('');
    const [lastname, setLname] = useState('');
    const nav = useNavigate();
    
    const [PostArr, setPostArr] = useState<ProfilePostType[]>([
        {threadTitle: "Thread 1", post: "Hello, this is my first post", date:"11/29/2022", time:"9:00 AM"},
        {threadTitle: "Thread 2", post: "Hi, this is another post", date:"11/29/2022", time:"9:15 AM"},
        {threadTitle: "Thread 3", post: "Hey, it's me Angelyn Rabe", date:"11/30/2022", time:"12:01 AM"},
      ])

      useEffect(() => {
        UserService.getUserDetails(userIdState).then((res)=>{
            setFname(res.firstname);
            setLname(res.lastname);
        })
      },[userIdState]);

      useEffect(()=>{
        if(!loginState){
            console.log(setPostArr)
            nav('/');
        }
    },[loginState, nav]);

      const logout = () => {
        dispatch(logoutReducer());
        dispatch(userIdReducer(0));
        dispatch(familyIdReducer(0));
        nav("/");
      }

  return (
    <div className="container">
        <div className="d-flex justify-content-center p-3" style={{width:"100%"}}>
            <div
            className="p-2 MainContainer"
            style={{ width: "50%", height: "auto", maxHeight: "80vh" }}
            >
                <div className="d-flex flex-row">
                    <div className="p-3">
                        <img
                        style={{width:"100px", height:"100px"}}
                        src="profileIcon.png"
                        alt="profile icon"
                        ></img>
                    </div>
                    
                    <div className="mt-3">
                    <h2 className="m-0" ><strong>{firstname}&nbsp;{lastname}</strong></h2>
                    <p className="m-0" style={{color:'red'}}>Delete Profile</p>
                    <p className="m-0"><Link to='/editprofile' className="linksColor">Edit Profile</Link></p>
                    <p className="m-0"><Link to="/" className="linksColor" onClick={logout}>Logout</Link></p>
                    </div>
                </div>
            </div>
        </div>
        <div
        className="px-5 mx-5"
        style={{ height: "5vh" }}
        >
            <h1><strong>Posts</strong></h1>
            {
                PostArr.length !== 0 ?
                PostArr.map((post, i) =>
                <ProfilePost threadTitle={post.threadTitle} post={post.post} date={post.date} time={post.time}></ProfilePost> 
                )
                :
                <p className="text-center">This user has no posts!</p>
            }
        </div>
      
    </div>
  );
}
export default Profilepage;
