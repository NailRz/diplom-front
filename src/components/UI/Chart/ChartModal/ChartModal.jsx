/* eslint-disable react/prop-types */
import cl from './ChartModal.module.css';

const ChartModal = ({children, visible, setVisible}) => {
    const rootClasses = [cl.MyModal]
    if (visible){
        rootClasses.push(cl.active)
    }
    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.MyModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};  

export default ChartModal; 