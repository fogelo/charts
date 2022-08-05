import React, {useEffect, useState} from 'react';
import {DSVRowArray} from "d3";
import * as d3 from "d3";

const Episode21 = () => {

    const csvUrl = "https://gist.githubusercontent.com/fogelo/6c7f8a44911a1640b52579d6998f82d9/raw/a6cc67d27005e324e2c7956aca6764b444dd692a/population"

    const [data, setData] = useState<DSVRowArray<string> | null>(null)

    useEffect(() => {
        d3.csv(csvUrl).then((res) => {
            setData(res)
        })

    }, [])
    console.log(data)
    return (
        <div>
            
        </div>
    );
};

export default Episode21;