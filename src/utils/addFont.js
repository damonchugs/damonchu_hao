const addFont = (arr) => {
  arr.map(t => {
    document.getElementsByTagName('head')[0].append(createLink(t))
  })
}

function createLink(t) {
  const link = document.createElement('link')
  link.href = t.href
  link.rel = t.rel
  link.type = t.type
  return link
}

export default addFont