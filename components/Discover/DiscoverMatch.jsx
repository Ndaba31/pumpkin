import React from 'react';
import DiscoverCard from './DiscoverCard';
import moreStyles from '@/styles/Matches.module.css'
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { FacebookOutlined, Star, StarBorder } from '@mui/icons-material';
import Image from 'next/legacy/image';


const DiscoverMatch = ({ users }) => {
    const [index, setIndex] = useState(0);

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
                    <Image className={moreStyles.button_img} src='/orangeLogo.svg' alt='pumpkin logo' height={50} width={50} />
                </IconButton>
			</div>
            
        </div>
    );
};

export default DiscoverMatch;