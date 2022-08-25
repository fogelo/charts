import React from 'react';
import MyLine from "./MyLine/MyLine";
import "./My.scss"
import MyMaskAndClipPath from "./MyMaskAndClipPath";
import MyGradient from "./MyGradient/MyGradient";


const My = () => {
    return (
        <div>
            {/*<MyLine/>*/}
            {/*<MyMaskAndClipPath/>*/}
            <MyGradient/>
        </div>
    );
};

export default My;