import React, {useState} from 'react';
import "./FreeCodeCamp.scss"
import Face from "./Face";
import MouseMove from "./MouseMove";
import Episode20 from "./Episode20";
import Episode21 from "./Episode21";
import Episode25 from "./Episode25";
import Episode26 from "./Episode26";
import DropdownEp30 from "./Episode31WithMenu/DropdownEp30";
import Episode31WithMenu from "./Episode31WithMenu/Episode31WithMenu";
import Episode32WithMenu from "./Episode32WithMenu/Episode32WithMenu";

const options = [
    {value: "dog", label: "Dog"},
    {value: "cat", label: "Cat"},
    {value: "hamster", label: "Hamster"},
    {value: "parrot", label: "Parrot"},
    {value: "spider", label: "Spider"},
    {value: "goldfish", label: "Goldfish"},
]
const initialValue = "hamster"

const FreeCodeCamp = () => {

    const [selectedValue, setSelectedValue] = useState(initialValue)

    console.log(selectedValue)
    return (
        <div>
            {/*<Face/>*/}
            {/*<MouseMove/>*/}
            {/*<Episode20/>*/}
            {/*<Episode21/>*/}
            {/*<Episode25/>*/}
            {/*<Episode26/>*/}

            {/*<label htmlFor={"pet-select"}>Choose a pet</label>*/}
            {/*<DropdownEp30 options={options}*/}
            {/*              id={"pet-select"}*/}
            {/*              selectedValue={selectedValue}*/}
            {/*              onSelectedValueChange={setSelectedValue}/>*/}

            {/*<Episode31WithMenu/>*/}
            <Episode32WithMenu/>

        </div>
    );
};

export default FreeCodeCamp;