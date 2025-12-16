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
            This block describes the project author. Here you should indicate
            your name, what you do, and which development technologies you know.
          </p>
          <p className="about__description">
            You can also talk about your experience with Practicum, what you
            learned there, and how you can help potential customers.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
