// App entry — design canvas with all KnowAI screens

const { useState, useEffect } = React;

function App() {
  const defaults = /*EDITMODE-BEGIN*/{
    "theme": "light"
  }/*EDITMODE-END*/;
  const [tweaks, setTweak] = useTweaks(defaults);
  const [showTweaks, setShowTweaks] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (!e.data) return;
      if (e.data.type === '__activate_edit_mode') setShowTweaks(true);
      if (e.data.type === '__deactivate_edit_mode') setShowTweaks(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const theme = tweaks.theme;

  return (
    <>
      <DesignCanvas background={theme === 'dark' ? '#0a0a0e' : '#ece8de'}>

        <DCSection id="landing" title="Landing" subtitle="Expanded from the reference. Three hero treatments.">
          <DCArtboard id="landing-main" label="Main · Editorial hero" width={1280} height={2400}>
            <Landing theme={theme} />
          </DCArtboard>
          <DCArtboard id="landing-b" label="B · Specimen / page-proof" width={1280} height={760}>
            <LandingHeroVariantB theme={theme} />
          </DCArtboard>
          <DCArtboard id="landing-c" label="C · Vol. 01 cover" width={1280} height={840}>
            <LandingHeroVariantC theme={theme} />
          </DCArtboard>
        </DCSection>

        <DCSection id="curriculum" title="Curriculum" subtitle="The whole map. Three tiers, twelve modules.">
          <DCArtboard id="syllabus" label="Syllabus · /courses" width={1280} height={1900}>
            <Syllabus theme={theme} />
          </DCArtboard>
        </DCSection>

        <DCSection id="reading" title="Mini-Textbook" subtitle="Reading view — prose, math, code, marginalia.">
          <DCArtboard id="reading" label="Chapter view · /writing/14.2" width={1280} height={1400}>
            <Reading theme={theme} />
          </DCArtboard>
        </DCSection>

        <DCSection id="practice" title="Problem Sets & Notebooks" subtitle="Where reading turns into running code.">
          <DCArtboard id="problem" label="Problem · in-browser editor" width={1280} height={900}>
            <Problem theme={theme} />
          </DCArtboard>
          <DCArtboard id="notebook" label="Marimo Lab · reactive notebook" width={1280} height={900}>
            <Notebook theme={theme} />
          </DCArtboard>
        </DCSection>

        <DCSection id="dashboard" title="Dashboard" subtitle="Logged-in home — resume, queue, streak.">
          <DCArtboard id="dashboard" label="Home · /dashboard" width={1280} height={1100}>
            <Dashboard theme={theme} />
          </DCArtboard>
        </DCSection>

        <DCSection id="papers" title="Papers" subtitle="Re-implementations + line-by-line notes.">
          <DCArtboard id="papers-index" label="Papers · index" width={1280} height={1700}>
            <PapersIndex theme={theme} />
          </DCArtboard>
          <DCArtboard id="paper-detail" label="Paper · deep-dive (Attention Is All You Need)" width={1280} height={1300}>
            <PaperDetail theme={theme} />
          </DCArtboard>
        </DCSection>

      </DesignCanvas>

      {showTweaks && (
        <TweaksPanel title="Tweaks" onClose={() => setShowTweaks(false)}>
          <TweakSection title="Appearance">
            <TweakRadio
              label="Theme"
              value={tweaks.theme}
              options={[{value:'light',label:'Light'},{value:'dark',label:'Dark'}]}
              onChange={v => setTweak('theme', v)}
            />
          </TweakSection>
        </TweaksPanel>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
