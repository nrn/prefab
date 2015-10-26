module.exports = addAction

global.action = addAction

function addAction (type, group) {
  if (addAction[type]) throw new Error(`Tried to define ${type} twice! Check ${group}`)
  var action = createBasicAction(type)
  addAction[type] = action

  if (!group) return
  if (!addAction[group]) addAction[group] = {}
  addAction[group][type] = action
}

function createBasicAction (type) {
  return function basicAction (payload) {
    return { type, payload }
  }
}

