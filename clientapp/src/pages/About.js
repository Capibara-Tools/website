import portrait from "../resources/portrait_placeholder.png";

export default function About() {
  return (
    <div class="about page docs">
      <h1>About Capibara</h1>
      <h2>Our Mission</h2>
      <p>
        Capibara is designed to make C documentation more accessible to
        developers, academics, and students by lowering the barrier to entry for
        understanding and writing in C.
      </p>
      <h2>The Team</h2>{" "}
      <div className="people">
        <div className="person">
          <div className="image">
            <img src="https://avatars.githubusercontent.com/u/41842051?v=4" />
          </div>
          <div className="attribution">
            <span className="name">Justin Woodring</span>
            <span className="description">Founder & Project Creator</span>
            <div className="links">
              <ul>
                <li>
                  <a href="https://justinwoodring.com">Website</a>
                </li>
                <li>
                  <a href="https://github.com/sponsors/JustinWoodring">Sponsor</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="person">
          <div className="image">
            <img src={portrait} />
          </div>
          <div className="attribution">
            <span className="name">You</span>
            <span className="description">Thankless Users & Contributors</span>
          </div>
        </div>
      </div>
    </div>
  );
}
