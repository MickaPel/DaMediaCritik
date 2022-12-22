//import '.styles.css';

import {useState } from 'react'
import { Rating } from 'react-simple-star-rating'

function Stars({rate}) {

    const [rating, setRating] = useState(0); //initial rating value

    const handleRating = (rate) => {
        setRating(rate);
        // other logic
    }

    return (
        <div>
            <Rating 
                tooltipArray={['nul', 'bof', 'moyen', 'top', 'génial']}
                allowHalfIcon                
                transition
                //showTooltip
                size={30}
                onClick={handleRating}
                ratingValue={rating} /* Available Props */
             />
             &nbsp;{rating} / 5 <input type="hidden" name="rating" id="rating" value={rating} />
        </div>
  )
  
}
export default Stars