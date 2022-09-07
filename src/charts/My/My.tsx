import React from 'react';
import MyLine from "./MyLine/MyLine";
import "./My.scss"
import MyMaskAndClipPath from "./MyMaskAndClipPath";
import MyGradient from "./MyGradient/MyGradient";
import MySelectionArea from "./MySelectionArea/MySelectionArea";


const My = () => {
    return (
        <div>
            {/*<MyLine/>*/}
            {/*<MyMaskAndClipPath/>*/}
            {/*<MyGradient/>*/}
            <MySelectionArea/>
        </div>
    );
};

export default My;