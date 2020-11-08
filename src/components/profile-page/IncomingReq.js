import React from 'react'
import * as Ctx from '../../utils/contexts'
import RequestTime from './RequestTime'
import Username from './UsernameInReq'
import AcceptRequestBtn from './AcceptRequestBtn'
import RejectRequestBtn from './RejectRequestBtn'


export default ({ data }) => (
  <div id="request">
    <Username user={data.sender}/>
    <Ctx.DecreaseUserStatsContext.Consumer>
      {decrease => 
        <Ctx.SetItemToDeleteContext.Consumer>
          {deleteItem => 
            <div id="reqButtons">
              <Ctx.IncreaseUserStatsContext.Consumer>
                {increase => 
                  <AcceptRequestBtn
                    reqId={data._id}
                    callback={_ => 
                      new Promise((resolve) => resolve(decrease('requestsFrom')))
                        .then(_ => {
                          increase('followers')
                          deleteItem(data._id)
                        })
                    }
                  />
                }
              </Ctx.IncreaseUserStatsContext.Consumer>
              <RejectRequestBtn
                reqId={data._id}
                callback={_ => {
                  decrease('requestsFrom')
                  deleteItem(data._id)
                }}
              />
            </div>
          }
        </Ctx.SetItemToDeleteContext.Consumer>
      }
    </Ctx.DecreaseUserStatsContext.Consumer>
    <p id="names">{`${data.sender.firstname} ${data.sender.lastname}`}</p>
    <RequestTime date={data.sentAt}/>
  </div>
)
