import {useEffect, useState} from "react";
import * as d3 from "d3";

const csvUrl = "https://gist.githubusercontent.com/fogelo/014461a9020371e714de7c5fcc08ec36/raw/74b221547c56da43e10b933fa23860fe6b7e3d98/iris.csv"

export const useData = () => {
    const [data, setData] = useState<any>(null)
    useEffect(() => {
        const row = (d: any) => {
            d.sepal_length = +d.sepal_length
            d.sepal_width = +d.sepal_width
            d.petal_length = +d.petal_length
            d.petal_width = +d.petal_width
            return d
        }

        // @ts-ignore
        d3.csv(csvUrl, row).then((res) => {
            setData(res)
        })

    }, [])

    console.log(data)
    return data
}