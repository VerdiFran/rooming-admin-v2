
export function* IdGenerator() {
    let id = 1000
    for (; ; id++) {
        yield id
    }
}
