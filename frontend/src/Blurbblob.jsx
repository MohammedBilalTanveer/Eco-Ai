import React from 'react'
import PropTypes from 'prop-types'
const Blurblob = ({position,size}) => {
  const {top,left} = position;
  const {width,height} = size;
  return (
    <div className='absolute' style={{
        top: top,
        left: left,
        width: width,
        height: height,
        transform: 'translate(-50%,-50%)'
    }}>
      <div className="w-full h-full bg-teal-500 rounded-full opacity-20 blur-3xl animate-Blob">
      </div>
    </div>
  )
}
Blurblob.propTypes = {
  position: PropTypes.shape({
        top:PropTypes.string,
        left:PropTypes.string,
  }),
  size: PropTypes.shape({
    width:PropTypes.string,
    height: PropTypes.string,
  })
}

export default Blurblob