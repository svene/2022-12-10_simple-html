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

createEffect(() => {
    state.prod = state.a * state.b
})

// Let's test it out!

console.log({ ...state })

console.log('Setting a to', 5)
state.a = 5

Promise.resolve().then(() => {
    console.log({ ...state })
})

// -------------------------------------------------------
const tokensToTemplate = new WeakMap()

function parseTemplate(htmlString) {
    const template = document.createElement('template')
    template.innerHTML = htmlString
    return template
}

function html(tokens, ...expressions) {
    const replaceStubs = (string) => (
            string.replaceAll(/__stub-(\d+)__/g, (_, i) => (
                    expressions[i]
            ))
    )
    // get or create the template
    let template = tokensToTemplate.get(tokens)
    if (!template) {
        const stubs = expressions.map((_, i) => `__stub-${i}__`)
        const allTokens = tokens.map((token, i) => (stubs[i - 1] ?? '') + token)
        const htmlString = allTokens.join('')
        template = parseTemplate(htmlString)
        tokensToTemplate.set(tokens, template)
    }
    // clone and update bindings
    const cloned = template.content.cloneNode(true)
    const element = cloned.firstElementChild
    for (const { name, value } of element.attributes) {
        element.setAttribute(name, replaceStubs(value))
    }
    element.textContent = replaceStubs(element.textContent)
    return element
}

function render(state) {
    return html`
    <div class="${state.color}">${state.text}</div>
  `
}

// Let's test it out!
document.body.appendChild(render({ color: 'blue', text: 'Blue!' }))

// And again!
document.body.appendChild(render({ color: 'red', text: 'Red!' }))
