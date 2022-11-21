import style from '../styles/home.module.css';
import { useState, useEffect } from 'react'; 
import { useContract, useSigner, useAccount } from 'wagmi';
import {CONTRACT_ADDRESS, CONTRACT_ABI} from "../files/index.js"

export default function Home() {
  const [value , setValue] = useState("");
  const {isConnected} = useAccount();
  const {data:signer, isError, isLoading} = useSigner();
  const contract = useContract({
          address:CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          signerOrProvider: signer,
         }) 
         
  useEffect(()=>{
      if(!isConnected){
        alert("please connect your wallet")
      }
  },[isConnected])
  
  
  function handleOnChange(e:any){
     setValue(e.target.value);
   }
  
  async function handleSubmit(){
    try{
      if(!isConnected) {
        alert("connect your wallet...")
        return
      }
      const tx = await contract.addConfession(value);
      await tx.wait();
      alert("added the confession")
    }
    catch(err){
      console.log(err.message);
    }
  }

  return (
    <div>        
       <div className={style.wrapper}>
            <h1 className='text-[2em] font-2xl text-center absolute top-0 w-[100%]'>CONFESSION BOX</h1>
            <input className='p-3' type="text" onChange={handleOnChange} placeholder='Enter Your Confession'/>
            <button onClick={handleSubmit} className='p-2 font-xl bg-lime-400 w-[20%] mx-auto mt-3 rounded'>Submit</button> 
        </div> 
    </div>
  )
}
