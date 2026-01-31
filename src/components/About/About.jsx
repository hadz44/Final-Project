import './About.css'
import authorImage from '../../assets/author.png'

function About() {
  return (
    <section className="about">
      <div className="about__content">
        <div className="about__image-container">
          <img
            src={authorImage}
            alt="Author portrait"
            className="about__image"
            loading="lazy"
          />
        </div>
        <div className="about__text">
          <h2 className="about__title">About the author</h2>
          <p className="about__description">
            This project brings together stock insights and financial news in one
            place. Search for real-time stock data, explore recent articles, and save
            the stories or tickers you want to revisit.
          </p>
          <p className="about__description">
            My name is Hadi Frifer and I am a student at TripleTen. I built this app
            to make it simple to track market updates, compare sources, and build a
            personalized watchlist.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
