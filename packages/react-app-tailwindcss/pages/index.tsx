import style from '../styles/home.module.css'; 

export default function Home() {
  return (
    <div>
        <div className={style.wrapper}>
            <h1 className='text-[2em] font-2xl text-center absolute top-0 w-[100%]'>CONFESSION BOX</h1>
            <input className='p-3' type="text" placeholder='Enter Your Confession'/>
            <button className='p-2 text-black'>Submit</button> 
        </div> 
    </div>
  )
}
