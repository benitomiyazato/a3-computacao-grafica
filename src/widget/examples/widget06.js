import { getColorIterator } from "../utils/colors/color.js"
import blob from "../utils/blob/blob.js"

export default function (key, draw) {

    let nextColor = getColorIterator(key)

    let b = blob(key.next256())
    console.log(b);
    b.fill(nextColor())
    b.move(-100,-200).size(key.next16() * 40 + 100)
    b.addTo(draw)

    b = blob(key.next256())
    b.fill(nextColor())
    b.move(500,-200).size(key.next16() * 40 + 100)
    b.addTo(draw)

    b = blob(key.next256())
    b.fill(nextColor())
    b.move(-100,400).size(key.next16() * 40 + 100)
    b.addTo(draw)

    b = blob(key.next256())
    b.fill(nextColor())
    b.move(500,400).size(key.next16() * 40 + 100)
    b.addTo(draw)
}