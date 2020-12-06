import React, { useState, useLayoutEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserGraduate, faUserMd, 
         faUserAstronaut, faUserNinja, faUserSecret, 
         faUserCheck, faUserNurse 
} from '@fortawesome/free-solid-svg-icons'
import { SetEditUserContext } from '../../../utils/contexts'
import userIdComparer from '../../../utils/userIdComparer'


export default ({ userId }) => {
  const [ icons ] = useState([faUser, faUserGraduate, faUserMd, 
    faUserAstronaut, faUserNinja, faUserSecret, 
    faUserCheck, faUserNurse ])
  const [ iconToShow, setIconToShow ] = useState(0)

  useLayoutEffect(_ => {
    setIconToShow(Math.floor((Math.random() * 8)))
  }, [])

  return(
    <SetEditUserContext.Consumer>
      {({ set }) => 
        <FontAwesomeIcon 
          id="h1-Icon" 
          icon={icons[iconToShow]}
          onClick={_ => {
            if(!userIdComparer(userId))
              set('Avatar')
          }}
        /> 
      }
    </SetEditUserContext.Consumer>
  )
}
