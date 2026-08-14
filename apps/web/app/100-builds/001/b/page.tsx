import { HumanLoopReveal } from '@rn/visuals';

export default function Build001B(){
  return <main className="build-wrap build-001-b">
    <div className="eyebrow">BUILD 001-B / 100 · VISUAL REVEAL BUILD</div>
    <h1>Human in the Loop</h1>
    <p className="lede">The announcement is also a build. This five-beat visual starts with the phrase everyone recognizes, breaks it open, and ends by revealing the functional tool it produced.</p>
    <HumanLoopReveal />
    <section className="method-note">
      <div className="eyebrow">How this becomes a LinkedIn post</div>
      <h2>The web interaction is the master artifact.</h2>
      <p>LinkedIn does not let a normal feed post run arbitrary interactive HTML. So this master is designed to be captured as a short vertical/square motion piece for the feed, while the live interactive version remains on RN Builds. The post can deliver the reveal in-feed and link to 001-A for the actual tool.</p>
    </section>
  </main>
}
