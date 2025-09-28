import React from 'react';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import JsEditor from './components/JsEditor';
import CssEditor from './components/CssEditor';
import HtmlEditor from './components/HtmlEditor';
import { useTheme } from './context/ThemeContext';
import { TabView, TabPanel } from 'primereact/tabview';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { html_str, css_str, js_str, TabsTemplate } from './consts';

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [HTMLvalue, setHTMLValue] = React.useState<string>(html_str);
  const [CSSvalue, setCSSValue] = React.useState<string>(css_str);
  const [JSvalue, setJSValue] = React.useState<string>(js_str);
  const JSonChange = React.useCallback((val: string) => setJSValue(val), []);
  const CSSonChange = React.useCallback((val: string) => setCSSValue(val), []);
  const HTMLonChange = React.useCallback((val: string) => setHTMLValue(val), []);
  const [layout, setLayout] = React.useState<'horizontal' | 'vertical'>('horizontal');
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  React.useEffect(toggleTheme, []);
  React.useEffect(() => {
    const handleResize = () => setLayout(window.innerWidth < 640 ? 'vertical' : 'horizontal');
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const runCode = () => { // Function to run/update the code in iframe
    if (iframeRef.current) {
      let finalHTML = HTMLvalue; // Use HTML exactly as written by user
      if (CSSvalue.trim() && !finalHTML.includes('<style>'))// Only add CSS/JS if they don't already exist in the HTML 
        finalHTML = finalHTML.includes('</head>') ?
          finalHTML.replace('</head>', `<style>${CSSvalue}</style></head>`) :
          (`<style>${CSSvalue}</style>${finalHTML}`); // Find best place to inject CSS
      if (JSvalue.trim() && !finalHTML.includes('<script>'))// Add JS at the end
        finalHTML += `<script>${JSvalue}</script>`;
      iframeRef.current.srcdoc = finalHTML;
    }
  };
  const downloadHTML = () => {
    let finalHTML = HTMLvalue; // Use HTML exactly as written by user
    if (CSSvalue.trim() && !finalHTML.includes('<style>'))// Only add CSS/JS if they don't already exist in the HTML 
      finalHTML = finalHTML.includes('</head>') ?
        finalHTML.replace('</head>', `<style>${CSSvalue}</style></head>`) :
        (`<style>${CSSvalue}</style>${finalHTML}`); // Find best place to inject CSS
    if (JSvalue.trim() && !finalHTML.includes('<script>'))// Add JS at the end
      finalHTML += `<script>${JSvalue}</script>`;
    const blob = new Blob([finalHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'index.html';
    link.click();
    URL.revokeObjectURL(url);
  };
  React.useEffect(() => {
    const timeoutId = setTimeout(() => runCode(), 1000);
    return () => clearTimeout(timeoutId);
  }, [HTMLvalue, CSSvalue, JSvalue]);

  return (
    <React.Fragment>
      <Menubar
        model={[
          { label: "github", icon: "pi pi-github", url: import.meta.env.VITE_GITHUB_URL },
          { label: "linkedin", icon: "pi pi-linkedin", url: import.meta.env.VITE_LINKEDIN_URL }
        ]}
        style={{ padding: "8px" }}
        start={<img
          alt="logo"
          src="./logo.svg"
          height="40"
          style={{ marginRight: "0.5rem" }}
        />}
        end={
          <Button
            icon={theme === 'light' ? 'pi pi-sun' : 'pi pi-moon'}
            onClick={toggleTheme}
          />
        }
      />
      <Splitter
        layout={layout}
        style={{ height: "calc(100dvh - 6.4rem)", marginTop: "1rem" }}
      >
        <SplitterPanel className="flex justify-content-center" minSize={15}>
          <TabView style={{ width: "100%", height: "100%" }}>
            <TabPanel headerTemplate={TabsTemplate[0]}>
              <div style={{ height: '100%', width: '100%' }}>
                <HtmlEditor
                  code={HTMLvalue}
                  onChange={HTMLonChange}
                  theme={theme}
                />
              </div>
            </TabPanel>
            <TabPanel headerTemplate={TabsTemplate[1]}>
              <div style={{ height: '100%', width: '100%' }}>
                <CssEditor
                  code={CSSvalue}
                  onChange={CSSonChange}
                  theme={theme}
                />
              </div>
            </TabPanel>
            <TabPanel headerTemplate={TabsTemplate[2]}>
              <div style={{ height: '100%', width: '100%' }}>
                <JsEditor
                  code={JSvalue}
                  onChange={JSonChange}
                  theme={theme}
                />
              </div>
            </TabPanel>
          </TabView>
        </SplitterPanel>

        <SplitterPanel className="flex flex-column" minSize={30}>
          {/* Preview Header */}
          <div className="flex align-items-center justify-content-between p-2 border-bottom-1 surface-border">
            <div className="flex align-items-center gap-2">
              <i className="pi pi-eye text-primary"></i>
              <span className="font-semibold">Live Preview</span>
            </div>
            <div className="flex gap-1">
              <Button
                icon="pi pi-refresh"
                className="p-button-text p-button-sm"
                onClick={runCode}
              />
              <Button
                icon="pi pi-external-link"
                className="p-button-text p-button-sm"
                onClick={() => {
                  const newWindow = window.open('', '_blank');
                  if (newWindow && iframeRef.current) {
                    newWindow.document.write(iframeRef.current.srcdoc || '');
                  }
                }}
              />
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1" style={{ position: 'relative' }}>
            <iframe
              ref={iframeRef}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                backgroundColor: 'white'
              }}
              title="Live Preview"
            />
          </div>

          {/* Bottom Controls */}
          <div className="flex align-items-center justify-content-between p-2 border-top-1 surface-border">
            <div className="flex gap-2">
              <Button
                label="Run Code"
                icon="pi pi-play"
                className="p-button-success p-button-sm"
                onClick={runCode}
              />
              <Button
                label="Clear"
                icon="pi pi-trash"
                className="p-button-danger p-button-outlined p-button-sm"
                onClick={() => {
                  setHTMLValue('<body><h1>Hello World!</h1></body>');
                  setCSSValue('/* CSS Styles */');
                  setJSValue('// JavaScript Code\nconsole.log("Hello World!");');
                }}
              />
              <Button
                label="Download"
                icon="pi pi-download"
                className="p-button-outlined p-button-sm"
                onClick={downloadHTML}
              />
            </div>
          </div>
        </SplitterPanel>
      </Splitter>
    </React.Fragment>
  );
};

export default App;