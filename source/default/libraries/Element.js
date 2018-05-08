/**
 * instead of creating elements, [adding classes, text content
 *  defining events, appending children etc..]
 *  step by step, 
 * this function can do it based on the provided options 
 * 
 * @param {string} type 
 * @param {JSON} options
 * @returns html element 
 */
export default function Element (type, options) { // just a quick & dirty function for creating DOM (element)s
  let elm = document.createElement(type)

  for (let key in options) {
    if (/^events?$/i.test(key)) {
      for (let key2 in options[key]) {
        if (typeof options[key][key2] === 'function') { // else wrong!
          elm.addEventListener(key2, options[key][key2])
        }
      }
    } else if (/^(childrens?|innerhtml)$/i.test(key)) {
      for (let key2 in options[key]) { // maybe it has multible elements of same
        // e.g. p: [{...}, {...}]
        if (Array.isArray(options[key][key2])) {
          for (let i = 0; i < options[key][key2].length; i++) {
            let child = Element(key2, options[key][key2][i])
            elm.appendChild(child)
          }
        } else {
          let child = Element(key2, options[key][key2])
          elm.appendChild(child)
        }
      }
    } else if (/^class(name|list|)$/i.test(key)) {
      if (Array.isArray(options[key])) {
        for (let i = 0; i < options[key].length; i++) {
          elm.classList.add(options[key][i])
        }
      } else elm.className = options[key]
    } else if (/text$/i.test(key)) { // innerText
      elm.innerText = options[key]
    } else if (/^(design|style)/i.test(key)) {
      for (let key2 in options[key]) {
        elm.style[key2] = options[key][key2]
      }
    } else { // the rest should just be some attributes
      elm[key] = options[key]
    }
  }

  return elm
}
