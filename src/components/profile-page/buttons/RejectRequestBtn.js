import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import rejectOrAccept from '../../../actionHandlers/RejectAcceptReq'
import useTooltip from '../../../hooks/AnotherProfile/useTooltip'


export default ({ reqId, callback, withToolTip }) => {
  const [ loading, setLoading ] = useState(false)
   
  const component = <FontAwesomeIcon      
                      id={ loading? 'todoDeletingSpinner' : 'RejectRequest' }
                      icon={ loading ? faSpinner : faTimesCircle }
                      onClick={async _ => {
                        setLoading(true)
                        rejectOrAccept(
                          reqId,
                          val => setLoading(val),
                          callback,
                          false
                        )
                      }}
                    />
  const output = useTooltip(component, withToolTip, 'Reject', loading)

  return output
}