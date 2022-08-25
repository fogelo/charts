import React from 'react';


//defs - svg позволяет задавать графические объекты для последующего использования. Элементы внутри defs не отображаются немедленно.
//defs - это как максросы для последующего использования

//use для того чтобы использовать defs


const MyMaskAndClipPath = () => {
    return (
        <div>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                {/*<defs>*/}
                    <clipPath id="cut-off-bottom">
                        <rect x="0" y="0" width="200" height="100" />
                    </clipPath>
                {/*</defs>*/}

                <circle cx="100" cy="100" r="100" clipPath="url(#cut-off-bottom)" />
            </svg>
        </div>
    );
};

export default MyMaskAndClipPath;