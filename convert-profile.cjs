const fs = require('fs');

function htmlToJsx(htmlStr, componentName, extractMain = true) {
  let content = htmlStr;

  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  if (bodyMatch) {
    content = bodyMatch[1];
  }

  // Strip scripts/styles
  content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  content = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

  content = content.replace(/class=/g, 'className=');
  content = content.replace(/for=/g, 'htmlFor=');
  content = content.replace(/stroke-width/g, 'strokeWidth');
  content = content.replace(/stroke-dasharray/g, 'strokeDasharray');
  content = content.replace(/stroke-dashoffset/g, 'strokeDashoffset');
  content = content.replace(/stroke-linecap/g, 'strokeLinecap');
  
  content = content.replace(/style="font-variation-settings:\s*'FILL'\s*1;"/g, "style={{fontVariationSettings: \"'FILL' 1\"}}");
  
  content = content.replace(/<img([^>]*[^\/])>/g, '<img$1/>');
  content = content.replace(/<input([^>]*[^\/])>/g, '<input$1/>');
  content = content.replace(/<br([^>]*[^\/])>/g, '<br$1/>');
  content = content.replace(/<hr([^>]*[^\/])>/g, '<hr$1/>');

  // Strip aside and nav for AppLayout compatibility
  content = content.replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, '');
  content = content.replace(/<nav class="fixed left-0[\s\S]*?<\/nav>/gi, '');
  content = content.replace(/<header class="fixed top-0[\s\S]*?<\/header>/gi, '');
  
  const jsx = `import React from "react"
import { Link } from "react-router-dom"

export default function ${componentName}() {
  return (
    <>
      ${content}
    </>
  )
}
`;

  fs.writeFileSync('src/pages/' + componentName + '.jsx', jsx);
  console.log('Successfully generated ' + componentName + '.jsx');
}

htmlToJsx(fs.readFileSync('profile.html', 'utf8'), 'Profile', false);
