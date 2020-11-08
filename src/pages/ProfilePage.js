import React, { useContext, useRef, useState, memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons'
import * as Ctx from '../utils/contexts'
import Navbar from '../components/navbar/index'
import useLoader from '../hooks/Profile/useLoader'
import useUserInfoManager from '../hooks/Profile/useProfileInfoManager'
import Spinner from '../components/spiners/BigSpinner'
import User from '../components/profile-page/containers/index'
import EditProfileModal from '../components/profile-page/edit/EditProfileModal'
import AreYouSure from '../components/controls/AreYouSure'

 
export default memo(_ => {
  const [ error, setError ] = useState('')
  const [ editUser, setEditUser ] = useState('')
  const [ possibleEditOptions ] = useState([ 'Profile', 'Info', 'Privacy', 'Password', 'Delete' ])
  
  const Firstname = _ => useContext(Ctx.FirstnameContext)

  const firstname = useRef(Firstname().firstname)
  
  const [ loading, info ] = useLoader(setError)
  const [ userInfo, setUpdatedUser, setUpdatedUserInfo, setUpdatedUserSettings, setDecreaseUserStats, setIncreaseUserStats ] = useUserInfoManager(info)

  document.title = firstname.current

  return(
    <>
      <Navbar/>
      <Ctx.BrightThemeContext.Consumer> 
        {theme =>
          <div className={`${theme? 'Bright' : 'Dark'}Page Page`}>
            {loading && <Spinner/>}
            {error.length > 0 && <h3>{error}</h3>}   
            <Ctx.SetEditUserContext.Provider value={{ value: editUser, set: val => setEditUser(val) }}>
              <Ctx.UserDataContext.Provider value={userInfo}>
                {info._id && !loading &&
                  <Ctx.DecreaseUserStatsContext.Provider value={setDecreaseUserStats}>
                    <Ctx.IncreaseUserStatsContext.Provider value={setIncreaseUserStats}>
                      <User/>
                    </Ctx.IncreaseUserStatsContext.Provider>
                  </Ctx.DecreaseUserStatsContext.Provider>
                }
                {possibleEditOptions.some(p => p === editUser) &&
                  <Ctx.SetUpdatedUserContext.Provider value={{setSettings: setUpdatedUserSettings, setUser: setUpdatedUser, setInfo: setUpdatedUserInfo}}>
                    <EditProfileModal theme={theme}/>
                  </Ctx.SetUpdatedUserContext.Provider>
                }
                {editUser === 'AreYouSure' &&
                  <AreYouSure 
                    theme={theme} 
                    yes={_ => setEditUser('Delete')} 
                    no={_ => setEditUser('')}
                  >
                    <h2>Are you sure?</h2>
                    <p>  
                      All of your todos, followers and conversations will be lost
                      <FontAwesomeIcon icon={faHeartBroken}/>
                    </p>
                  </AreYouSure>
                }
              </Ctx.UserDataContext.Provider>
            </Ctx.SetEditUserContext.Provider>
          </div>
        }
      </Ctx.BrightThemeContext.Consumer>
    </>
  )
})