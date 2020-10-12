import serverUrl from '../../utils/serverUrl'
import headers from '../../utils/headers'
import query from '../../graphql/find-todos-for-user'


export default (token, page) => {
  headers.set('authorization', `Bearer ${token}`)
  return fetch(serverUrl, {
    headers: headers,
    method: 'POST',
    body: JSON.stringify(query(page)),
  }) 
    .then(res => res.json())
}