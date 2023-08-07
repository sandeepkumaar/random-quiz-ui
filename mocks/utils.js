// delay
import { createResponseComposition, context } from 'msw'

const delayRes = createResponseComposition(null, [
  context.delay(Math.floor(Math.random() * 3000))
])

export {
  delayRes
}
