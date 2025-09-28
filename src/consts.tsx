import {type TabPanelHeaderTemplateOptions} from "primereact/tabview";
import { FaHtml5, FaCss3, FaJs } from "react-icons/fa";
export const html_str = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Preview</title>
</head>
<body>
    <h1>Hello World!</h1>
    <p>Start coding...</p>
</body>
</html>
`;
export const css_str = `/* CSS Styles */
body {
  font-family: Arial, sans-serif;
  margin: 20px;
  background-color: #f0f0f0;
}

h1 {
  color: #333;
  text-align: center;
}`;

export const js_str = `// JavaScript Code
// Example: Change text color on click
document.addEventListener('DOMContentLoaded', function() {
  const h1 = document.querySelector('h1');
  if (h1) {
    h1.addEventListener('click', function() {
      h1.style.color = h1.style.color === 'red' ? '#333' : 'red';
    });
  }
});`;

export const TabsTemplate = [
  (options: TabPanelHeaderTemplateOptions) => (
    <div className="flex align-items-center gap-2 p-3" style={{ cursor: 'pointer' }} onClick={options.onClick}>
      <FaHtml5 color='orange' />
      <span className="font-bold white-space-nowrap">HTML</span>
    </div>
  ),
  (options: TabPanelHeaderTemplateOptions) => (
    <div className="flex align-items-center gap-2 p-3" style={{ cursor: 'pointer' }} onClick={options.onClick}>
      <FaCss3 color='purple' />
      <span className="font-bold white-space-nowrap">CSS</span>
    </div>
  ),
  (options: TabPanelHeaderTemplateOptions) => (
    <div className="flex align-items-center gap-2 p-3" style={{ cursor: 'pointer' }} onClick={options.onClick}>
      <FaJs color='yellow' />
      <span className="font-bold white-space-nowrap">JS</span>
    </div>
  )
];