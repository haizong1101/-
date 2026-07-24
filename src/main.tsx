import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// 可爱字体：英文儿童手写体 Schoolbell + 中文手绘感站酷快乐体（自托管，离线可用）
import '@fontsource/schoolbell'
import '@fontsource/zcool-kuaile'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// PWA：简单离线缓存
if ('serviceWorker' in navigator && !location.hostname.includes('localhost')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {})
  })
}
