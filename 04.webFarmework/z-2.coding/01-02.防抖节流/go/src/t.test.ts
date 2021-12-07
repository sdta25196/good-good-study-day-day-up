import { timer } from 'rxjs';
import { debounce } from "./debounce";
import { throttle } from './throttle';

describe("test", () => {
  it("debounce", (done) => {
    let count = 0;
    const __addCount = () => {
      count++
    }
    const addCount = debounce(__addCount, 100)
    const source = timer(0, 10)
    const subscription = source.subscribe((i) => {
      if (i === 100) {
        subscription.unsubscribe()
        setTimeout(() => {
          expect(count).toBe(1)
          done()
        }, 350)
      } else {
        addCount()
      }
    })
  })
  it("thorttle", (done) => {
    let count = 0;
    const __addCount = () => {
      count++
    }
    const addCount = throttle(__addCount, 100)
    const source = timer(0, 10)
    const subscription = source.subscribe((i) => {
      if (i === 100) {
        subscription.unsubscribe()
        expect(count).toBe(11)
        done()
      } else {
        addCount()
      }
    })
  })
})