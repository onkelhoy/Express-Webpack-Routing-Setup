import './style/main.scss'
import Element from './libraries/Element'

const sound = new Audio('content/mouse-over-sound-effect.wav')

window.onload = async function () {
  let res = await fetch('/api/applications')
  let apps = await res.json()

  let ul = createList(apps)
  document.body.appendChild(ul)
}

function createList (apps) {
  let children = apps.map(app => {
    return {
      event: {
        mouseover: e => {
          sound.play()
        }
      },
      children: {
        a: { text: app, href: '/'+app }
      }
    }
  })
  return Element('ul', {
    class: 'applications',
    children: {
      li: children
    }
  })
}

/* maybe later
async function loadImage (src) {
  return new Promise ()
}*/