import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link,useParams } from 'react-router-dom'


export default function Profile(props) {
	// state for the secret message (aka user privilaged data)
	const [msg, setMsg] = useState('')

	const [errorMessage, setErrorMessage] = useState('')

	const { yelpId } = useParams()

	const cafeSaves = props.currentUser.cafe

	// console.log('USERS SAVED CAFES', cafeSaves)
	console.log(props.currentUser)

	// map the cafeSaves arr
	const displaySaves = cafeSaves.map((save, i) => {
		return(
			<div key={`save${i}`}>
				<Link to={`/cafes/${save.yelpId}`}><h2 class-name='item1'>{save.name}</h2></Link> 
			</div>
			
		)
	})

	useEffect(() => {
	const fetchData = async () => {
			try {
				// get the token from local storage
				const token = localStorage.getItem('jwt')
				// make the auth headers
				const options = {
					headers: {
						'Authorization': token
					}
				}
				// hit the auth locked endpoint
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`, options)
				// example POST with auth headers (options are always last argument)
				// await axios.post(url, requestBody (form data), options)
				// set the secret user message in state
				setMsg(response.data.msg)
			} catch (err) {
				// if the error is a 401 -- that means that auth failed
				console.warn(err)
				if (err.response) {
					if (err.response.status === 401) {
						// panic!
						props.handleLogout()
					}
				}
			}
		}
		fetchData()
	}, []) // only fire on the first render of this component
	return (
		// <div>
		// 	<h1>Just brew it {props.currentUser.name}</h1>

		// 	{/* <p>your email is {props.currentUser.email}</p> */}

		// 	<h2>Here are your saved cafes:</h2>

		// 	<h3>{displaySaves}</h3>

		// </div>


		// <div class="card mb-4">
		<div class='bg'>
			{/* <img src="https://i.imgur.com/P3NYRmG.png" alt="avatar"
			class="rounded-circle img-fluid" style="width: 150px;" > */}
			<h5 className="item1">Just brew it {props.currentUser.name}</h5>
			<p className="sub-title">Your Saved Cafes Below:</p>
			<div class="d-flex justify-content-center mb-2">
			<p className="item1">{displaySaves}</p>
			</div>
			
		</div>
		// </div>





	)
}












