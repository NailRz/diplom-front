import classes from './ProfilePage.module.css'
const ProfilePage = () => {
    
    return (
        <div>
            <div className={classes.details}>
                <div className={classes.profileName}>profileName</div>
                <div className={classes.testStarted}>testStarted</div>
                <div className={classes.testCompleted}>testCompleted</div>
                <div className={classes.typingTime}>typingTime</div>
            </div>
            <div className={classes.results}>
                <div className={classes.seconds}>15sec</div>
                <div className={classes.seconds}>30sec</div>
                <div className={classes.seconds}>60sec</div>
                <div className={classes.seconds}>120sec</div>
            </div>
            <div className={classes.graphics}>graphics</div>
        </div>
    );
};

export default ProfilePage;