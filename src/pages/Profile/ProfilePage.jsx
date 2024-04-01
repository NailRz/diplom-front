import React from 'react';

const ProfilePage = () => {
    return (
        <div>
            <div className='details'>
                <div className='profileName'>profileName</div>
                <div className='testStarted'>testStarted</div>
                <div className='testCompleted'>testCompleted</div>
                <div className='typingTime'>typingTime</div>
            </div>
            <div className='results'>
                <div className='15sec'>15sec</div>
                <div className='30sec'>30sec</div>
                <div className='60sec'>60sec</div>
                <div className='120sec'>120sec</div>
            </div>
            <div className='graphics'>graphics</div>
        </div>
    );
};

export default ProfilePage;