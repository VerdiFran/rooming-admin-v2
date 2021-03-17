
export function* IdGenerator() {
    let id = 1
    for (; ; id++) {
        yield id
    }
}
