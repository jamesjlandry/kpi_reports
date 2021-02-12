import React from 'react'



let MiscKPIs = (props) => {

    const bioResKeys = Object.keys(props.data.bioRes)

    console.log(props)
    return (
        <div>
            Biopsy Result 
            <div>
                {bioResKeys.map(tech => <div key={`${tech}_bioRes`}> <div>{tech}: {props.data.bioRes[tech]}</div></div>)}
            </div>
        </div>
    )


}

export default MiscKPIs