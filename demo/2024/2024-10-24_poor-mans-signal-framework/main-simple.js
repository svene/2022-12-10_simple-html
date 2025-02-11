// Reactivity
const propsToEffects = {}
const dirtyEffects = []
let queued = false

const state = new Proxy({}, {
    get(obj, prop) {
        onGet(prop)
        return obj[prop]
    },
    set(obj, prop, value) {
        obj[prop] = value
        onSet(prop, value)
        return true
    } })


function onGet(prop) {
    if (currentEffect) {
        const effects = propsToEffects[prop] ?? (propsToEffects[prop] = [])
        effects.push(currentEffect)
    }
}

function flush() {
    while (dirtyEffects.length) {
        dirtyEffects.shift()()
    }
}

function onSet(prop, value) {
    if (propsToEffects[prop]) {
        dirtyEffects.push(...propsToEffects[prop])
        if (!queued) {
            queued = true
            queueMicrotask(() => {
                queued = false
                flush()
            })
        }
    }
}

function createEffect(effect) {
    currentEffect = effect
    effect()
    currentEffect = undefined
}

// Initial state

state.a = 1
state.b = 2

createEffect(() => {
    state.sum = state.a + state.b
})

// HTML rendering


function render(state) {
    const template = document.createElement('template');
    template.innerHTML = `
     <div class="${state.color}">
        <div ${state.text}</div>
         <div>a: ${state.a}</div>
         <div>b: ${state.b}</div>
     </div>
   `
    template.innerHTML = `
    <div class="${state.color}">${state.text}</div>
  `
    const cloned = template.content.cloneNode(true)
    const element = cloned.firstElementChild
    return element;
}

// Tying it all together

state.color = 'blue'

const container = document.getElementById('container')

createEffect(() => {
    console.log('rendering', state)
    const dom = render(state)
    if (container.firstElementChild) {
        container.firstElementChild.replaceWith(dom)
    } else {
        container.appendChild(dom)
    }
})

createEffect(() => {
    state.text = `Sum is: ${state.sum}, a: ${state.a}, b: ${state.b}`
})
