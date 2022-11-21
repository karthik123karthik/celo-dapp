import React, { useState } from "react";
import { useEffect } from "react";
import { format} from 'timeago.js';
import { useContract, useSigner, useAccount  , useContractEvent} from 'wagmi';
import {CONTRACT_ADDRESS, CONTRACT_ABI} from "../files/index.js";



export default function Confession(){
    const [data , setData ] = useState([]);
    const {isConnected} = useAccount();
    const {data:signer, isError, isLoading} = useSigner();
    const contract = useContract({
          address:CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          signerOrProvider: signer || null,
    })  

    useContractEvent({
        address:CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        eventName:'created',
        listener(owner, description, timestamp){
           const newData = data.slice()
           newData.unshift({
             owner:owner,
             description:description,
             time:timestamp
           }) ;
           setData(newData)
        }
    })



    useEffect(()=>{
    if(contract && signer){
     const run = async () => {
        if(isConnected){
           const newData = await contract.getAllConfessions();
           setData(newData.slice().reverse())
        }
     }
     run()
    }
    else{
        return
    }        
    },[contract,signer])


    return(
         data.map((ele,idx) => (
            <div key={idx} className='h-auto w-auto border-2 p-2 border-slate-600 m-3'>
                <h3 className="font-xl font-bold">Address : {ele.owner}</h3>
                <p className="text-lime-800 font-xl font-bold">Message:{ele.description}</p>
                <h4 className="font-xl font-bold">{`Posted: ${format(ele.time.toNumber()*(10**3))}`}</h4>
            </div>
         ))
    )
}