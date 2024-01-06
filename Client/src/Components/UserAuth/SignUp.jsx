
import signuplogo from '../../assets/bookSign.jpg'
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <>
    <div className='bg-gray-100  flex items-center justify-center '> 

{/* login container */}
<div className='bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl mt-20'>
    <div className='sm:w-1/2 px-16'>
        <h2 className='font-bold text-2xl text-[#002D74]'>Login</h2>
        <p className='text-sm mt-4 text-[#002D74]'>If you have already login</p>
        <form className='flex flex-col gap-4' action=''>
        <input className='p-2 mt-8 rounded-xl border' type='text' name='name' placeholder='Enter your Full Name'/>
            <input className='p-2  rounded-xl border' type='text' name='email' placeholder='Enter your Email'/>
            <input className='p-2  rounded-xl border' type='text' name='phone' placeholder='Enter your Phone Number'/>
           <div className='relative'>
           <input className='p-2 rounded-xl border w-full' type='password' name='password' placeholder='Enter your Password'/>

           <FaEye color='gray' className='absolute top-1/2 right-3 -translate-y-1/2'/>
           </div>
           <div className='relative'>
           <input className='p-2 rounded-xl border w-full' type='password' name='password' placeholder='Enter your Password'/>
           
           <FaEye color='gray' className='absolute top-1/2 right-3 -translate-y-1/2'/>
           </div>
            <butt className='bg-[#002D74] text-center rounded-xl text-white py-2 hover:bg-white hover:shadow-xl hover:text-[#002D74] cursor-pointer'>Register</butt>


        </form>
        
        <div className='mt-3 flex text-sm justify-between items-center '>
                <p className='border-gray-500'>Do you have Account?</p>
                <button className='py-2 px-4 rounded-xl bg-white border hover:bg-[#002D74] hover:text-white hover:shadow-lg '>
  <Link to='/login'>Login</Link></button>
            </div>

    </div>

    <div className='w-1/2 '>
        <img className='h-[500px] sm:block hidden rounded-2xl' src={signuplogo} />
    </div>

</div>

    </div>
      
    </>
  )
}

export default Signup
