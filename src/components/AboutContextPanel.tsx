import { aboutProfile } from '../data/content'

export function AboutContextPanel() {
  return (
    <section className="about-context" aria-labelledby="about-context-title">
      <div className="about-context__portrait" aria-hidden="true">VY</div>
      <div className="about-context__copy">
        <p className="meta-label">Profile</p>
        <h2 id="about-context-title">Vincent Yen</h2>
        <p>{aboutProfile.shortBio}</p>
        <dl>
          <div><dt>Studying</dt><dd>Computer Science</dd></div>
          <div><dt>Minor</dt><dd>Cybersecurity</dd></div>
          <div><dt>Creating</dt><dd>Web experiences and sports media</dd></div>
        </dl>
      </div>
    </section>
  )
}
