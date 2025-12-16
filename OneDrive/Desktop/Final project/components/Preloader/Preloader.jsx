import './Preloader.css'

function Preloader({ text = 'Searching for news...' }) {
  return (
    <div className="preloader">
      <div className="preloader__container">
        <div className="circle-preloader"></div>
        <p className="preloader__text">{text}</p>
      </div>
    </div>
  )
}

export default Preloader
