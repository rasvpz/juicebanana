import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = useSelector(store => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
       const { uid, email, displayName, photoURL } = user
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}))
        navigate('/browse')

      } else {
        // User is signed out
        dispatch(removeUser())
        navigate('/')
      }
    });
  }, [dispatch, navigate])

  const signoutButton = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        navigate('/')

      }).catch((error) => {
        // An error happened.
      });
}
  return (
    <div className="flex items-center  justify-between px-6 py-4 z-10">
      <div className="flex items-center space-x-2">
        <img className="rounded-full w-10 h-10 border-2 border-white" src="/logo192.png" alt="logo" />
        <span className="text-lg font-bold text-[#ffdf27] ">Le Banana</span>
      </div>
      <div>
        <span type="button" className="text-white font-bold">
          {user?.displayName ? user?.displayName : "" }</span>
          {
            user?.displayName ? 
          <div onClick={signoutButton} className="ml-4 text-red-600 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m6.364-5.657a7.5 7.5 0 11-12.728 0" />
          </svg>
          </div>
          : 
          "" 
          }
        
      </div>
    </div>
  );
};

export default Header;
