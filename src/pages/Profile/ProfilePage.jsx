import classes from './ProfilePage.module.css'
const ProfilePage = () => {
    
    return (
        <div>
            <div className={classes.Details}>
                <div className={classes.ProfileName}>profileName</div>
                <div className={classes.TestStarted}>testStarted</div>
                <div className={classes.TestCompleted}>testCompleted</div>
                <div className={classes.TypingTime}>typingTime</div>
            </div>
            <div className={classes.Results}>
                <div className={classes.Seconds}>15sec</div>
                <div className={classes.Seconds}>30sec</div>
                <div className={classes.Seconds}>60sec</div>
                <div className={classes.Seconds}>120sec</div>
            </div>
            <div className={classes.Graphics}>graphics</div>
        </div>
    );
};

export default ProfilePage;