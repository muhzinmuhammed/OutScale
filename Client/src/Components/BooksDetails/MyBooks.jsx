

const MyBooks = () => {
    return (
      <div className='bg-purple-950 h-[100%] font-serif text-white'>
         
      <div className='text-center py-10'>
          <h5 className='text-indigo-300'>Testimonial</h5>
          <h1 className='text-4xl w-96 mx-auto leading-normal font-bold mb-12'>Read what others say</h1>
          <input type='search' placeholder='search'/>
          <div className='grid xl:grid-cols-3 sm:grid-cols-2 mt-10  max-w-5xl gap-8 mx-auto group'>
              <div className='bg-white/10 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 duration-500 cursor-pointer p-8 rounded-xl '>
                  <img className='h-20 mx-auto' src='https://img.a.transfermarkt.technology/portrait/big/28003-1694590254.jpg?lm=1' />
                  <h4 className='font-bold uppercase text-xl'>Messi Leo</h4>
                  <p className='text-sm leading-7 my-3 font-light opacity-50'>when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passage.</p>
                    <div className="grid grid-cols-2 bg-inherit">
                    <button className='gap-x-2 py-2.5 px-8 rounded-full'>Get In Touch</button>
                    <button className='gap-2 py-2.5 px-8 rounded-full'>Get In Touch</button>
                    </div>
              </div>
              <div className='bg-white/10 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 duration-500 cursor-pointer p-8 rounded-xl '>
                  <img className='h-20 mx-auto' src='data:image/jpeg;base64,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' />
                  <h4 className='font-bold uppercase text-xl'>CR7</h4>
                  <p className='text-sm leading-7 my-3 font-light opacity-50'>when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passage.</p>
                    <button className='bg-inherit py-2.5 px-8 rounded-full'>Get In Touch</button>
              </div>
              <div className='bg-white/10 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 duration-500 cursor-pointer p-8 rounded-xl '>
                  <img className='h-20 mx-auto' src='https://img.a.transfermarkt.technology/portrait/big/68290-1697056482.png?lm=1' />
                  <h4 className='font-bold uppercase text-xl'>Neymar</h4>
                  <p className='text-sm leading-7 my-3 font-light opacity-50'>when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passage.</p>
                    <button className='bg-inherit justify-between py-2.5 px-8 rounded-full'>Get In Touch</button>
                    
              </div>
  
          </div>
          
      </div>
     
  </div>
    )
  }
  
  export default MyBooks
  