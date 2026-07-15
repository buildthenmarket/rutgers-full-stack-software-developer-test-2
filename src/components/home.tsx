import Carousel from 'react-bootstrap/Carousel';

function Home() {
  return (
    <>
      <div className="row">
        <div className="custom-carousel-wrapper">
          <Carousel
            interval={10000}
            fade
            indicators={true}
            controls={true}
          >
            <Carousel.Item>
              <div className="quote-content">
                <blockquote>
                  "Strong minds discuss ideas; average minds discuss events;
                  weak minds discuss people"
                </blockquote>
                <cite>— Socrates</cite>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="quote-content">
                <blockquote>
                  "Absorb what is useful, discard what is not, add what is
                  uniquely your own."
                </blockquote>
                <cite>— Bruce Lee</cite>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="quote-content">
                <blockquote>
                  "Luck is what happens when preparation meets opportunity."
                </blockquote>
                <cite>— Stoicism (many people have said this)</cite>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
      <div className="row">
        <div className="col m-4 border rounded p-3 border-secondary">
          <h3>Anagram Hunt</h3>
          <p>
            lorem ipsum. dummy text. placeholder description. mock content.
            stubbed copy.
          </p>
          <a href="/anagram-hunt" className="btn btn-success float-end">
            Play
          </a>
        </div>
        <div className="col m-4 border rounded p-3 border-secondary">
          <h3>Math Facts Practice</h3>
          <p>
            game 2. dummy text. placeholder description. mock content. stubbed
            copy.
          </p>
          <a href="/math-facts" className="btn btn-success float-end">
            Play
          </a>
        </div>
      </div>
    </>
  );
}

export default Home;
