import React from "react";
import { format} from 'timeago.js';

const data = [{
    
}];

export default function Confession(){
    return(
         data.map(ele => (
            <div className='h-auto w-auto border-2 p-2 border-slate-600 m-3'>
                <h3 className="font-xl font-bold">Address : {ele.address}</h3>
                <p className="text-lime-800 font-xl font-bold">Message:{ele.description}</p>
                <h4 className="font-xl font-bold">{`Posted: ${format(ele.time)}`}</h4>
            </div>
         ))
    )
}