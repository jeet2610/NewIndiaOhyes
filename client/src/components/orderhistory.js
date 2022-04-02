import React from 'react'

const orderhistory = props =>{
    return (
        <div>
            
        <div class=" w-full h-20 bg-pink-100 rounded-lg">

        <div class= "  px-4 py-3 flex justify-between ">
            <span>{props.title}</span>
            <div>
                <span>{props.date}</span>
            </div>
        </div>
      
        <div class="px-4">
          <span>{props.totalPrice}₹</span>
        </div>
      
      </div>


        </div>
    )
}

export default orderhistory
