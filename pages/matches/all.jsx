import Discover from '@/components/Discover/Discover';
import Header from '@/components/Head/Head';
import Navbar from '@/components/Navbar/Navbar';
import React from 'react'
import { useState,useEffect } from 'react';
import styles from '@/styles/Matches.module.css'
import { useSession } from 'next-auth/react';
import { useDateContext } from '@/context/dateContext';

const all = () => {

  
  const { data: session } = useSession();
  const { setUser} = useDateContext();

  const [slideYou, setSlideYou] = useState([]);
	const [youAccept, setYouAccept] = useState([]);
	const [youReject, setYouReject] = useState([]);
	const [yourSlide, setYourSlide] = useState([]);
	const [acceptedRequest, setAcceptedRequest] = useState([]);
	const [rejectedRequest, setRejectedRequest] = useState([]);

	
	useEffect(() => {
		const getMatchesInfo = async () => {
		  try {
			const result = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/newUser`, {
			  method: 'PUT',
			  headers: {
				'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({
				email: session ? session.user.email : '',
			  }),
			});
	  
			if (result.ok) {
			  const { user } = await result.json();
			  setUser(user);
			} else {
			  const { error } = await result.json();
			  console.log(error);
			}
	  
			const myMatchesResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/matches`, {
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({
				email: session ? session.user.email : '',
			  }),
			});
	  
			const {
			  slideForYou,
			  youAcceptedMatch,
			  youRejectedMatch,
			  slideForCrush,
			  crushAccepted,
			  crushRejected,
			} = await myMatchesResponse.json();

			console.log(slideForYou);
			console.log(youAcceptedMatch);
			console.log(youRejectedMatch);
			console.log(slideForCrush);
			console.log(crushAccepted);
			console.log(crushRejected);
	  
			setSlideYou(slideForYou);
			setYouAccept(youAcceptedMatch);
			setYouReject(youRejectedMatch);
			setAcceptedRequest(crushAccepted);
			setRejectedRequest(crushRejected);
			setYourSlide(slideForCrush);
	  
			console.log(slideYou);
			console.log(youAccept);
	  
		  } catch (error) {
			console.error(error);
		  }
		};
	  
		getMatchesInfo();
	  }, []);

  return (
    <div className={styles.body_all}>
      <Header title='AllMatches'/>
      <Navbar />
      <Discover color='white' category='Positive Fruits' users={slideYou}/>
      <Discover color='white' category='Approved Fruits' users={youAccept}/>
      <Discover color='white' category='Rejected Fruits' users={youReject} />
      <Discover color='white' category='Your Fruit Crushes' users={yourSlide}/>
      <Discover color='white' category='Accepted Fruits' users={acceptedRequest}/>
      <Discover color='white' category='Denied Fruits' users={rejectedRequest}/>
    </div>
  )
}

export default all