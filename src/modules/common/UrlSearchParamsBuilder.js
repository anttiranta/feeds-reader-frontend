/**
 * @param {number} page
 * @param {number} limit
 */
export default function build(page, limit) {
    let params = new URLSearchParams()
    params.set('p', page || 1)
    params.set('limit', limit || 5)
    return params
}