import './About.css'

function About() {
  return (
    <section className="about">
      <div className="about__content">
        <div className="about__image-container">
          <img
            src="#"
            alt="Author"
            className="about__image"
          />
        </div>
        <div className="about__text">
          <h2 className="about__title">About the author</h2>
          <p className="about__description">
            This website is a stock market analyzer that allows you to search for stocks and view their price movements.My name is Hadi Frifer and I am a student at TripleTen.
          </p>
          <p className="about__description">
            I had a great experience with TripleTen building websites and learning multiple programming languages, I would recommend it to anyone who wants to learn how to code.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
