export const rangeArr = (start: number, end: number | false) => {
    if (!end) return []
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
}
