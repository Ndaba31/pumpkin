import React from 'react';
import DiscoverCard from './DiscoverCard';
import moreStyles from '@/styles/Matches.module.css'
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { FacebookOutlined, Star, StarBorder } from '@mui/icons-material';
import Image from 'next/legacy/image';


const DiscoverMatch = ({ users }) => {
    const [index, setIndex] = useState(0);

    const MyLogo = () => {
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="79.000000pt" height="80.000000pt" viewBox="0 0 79.000000 80.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,80.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M178 791 c-58 -12 -114 -57 -143 -114 -21 -43 -25 -65 -25 -137 0
-118 24 -165 137 -268 102 -92 143 -156 143 -224 0 -36 4 -48 15 -48 25 0 23
94 -2 145 -9 16 -66 82 -128 145 -122 126 -139 157 -139 250 2 191 180 291
323 181 l23 -18 -22 -43 c-30 -60 -36 -140 -16 -220 19 -73 20 -74 39 -67 13
5 12 13 0 59 -21 78 -13 188 18 232 36 52 74 71 146 70 123 -1 203 -74 203
-186 0 -45 14 -69 30 -52 4 5 4 39 0 77 -14 124 -83 185 -219 194 -56 4 -73 1
-113 -20 -47 -24 -48 -24 -65 -5 -39 43 -129 64 -205 49z"/>
</g>
</svg>
    }

    const handleClickNext = () => {
        const nextIndex = (index + 1) % users.length;
        setIndex(nextIndex);
    };

    const handleClickPrevious = () => {
        const previousIndex = (index - 1 + users.length) % users.length;
        setIndex(previousIndex);
    };

    if (!users || users.length === 0) {
        return null;
    }

    const user = users[index];

    if (!user) {
        return null;
    }

    const { profile_photo } = user;

    return (
        <div>
            
            <div className={moreStyles.container}>
                <button className={moreStyles.navigateLeft} onClick={handleClickPrevious}>Previous</button>
                  <DiscoverCard user={user} />
               <button className={moreStyles.navigateRight} onClick={handleClickNext}>Next</button>
            </div>
            <div className={moreStyles.buttons}>
            <IconButton className={moreStyles.profile_button} style={{marginRight: '20px'}}>
          <StarBorder color="warning" />
          {/* <Star color='warning' /> */}
          </IconButton>
				<IconButton className={moreStyles.profile_button_right}>
                    <Image src='/logo.svg' alt='pumpkin logo' layout='fill' objectFit="cover"/>
                </IconButton>
			</div>
            
        </div>
    );
};

export default DiscoverMatch;