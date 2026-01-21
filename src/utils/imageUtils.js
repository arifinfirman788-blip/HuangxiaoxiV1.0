export const getPlaceholder = (width, height, text) => {
  const w = parseInt(width) || 200;
  const h = parseInt(height) || 200;
  const fontSize = Math.floor(Math.min(w, h) * 0.1);
  
  const svg = `
  <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#e2e8f0"/>
    <text x="50%" y="50%" font-family="Arial" font-size="${fontSize}" fill="#64748b" font-weight="bold" text-anchor="middle" dy=".3em">${text || `${w}x${h}`}</text>
  </svg>
  `;
  
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.trim())}`;
};
