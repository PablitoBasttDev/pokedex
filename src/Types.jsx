import './Types.css'

export function Types({types}){
    
    
    return(
        <>
            {types && types.map(t=>{
                return(
                    <h5 className={'type '+t} >{t.toUpperCase()}</h5>
                )
            })}
        </> 
    )
}