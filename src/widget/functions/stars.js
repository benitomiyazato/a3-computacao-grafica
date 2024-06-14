const offset = 2.6;
const starSize = 7.3;
function generateStars(key, draw) {
    for (let i = 0; i < key.next256() * 10; i++) {
        draw.circle().size(starSize * key.next16() / 15).move(key.next256() * offset * (1+key.next16()/100), key.next256()).fill("white").opacity(key.next16() / 17);     
        draw.circle().size(starSize * key.next16() / 15).move(key.next256()  * offset + 350 * (1+key.next16()/100), key.next256()).fill("white").opacity(key.next16() / 17);       
        draw.circle().size(starSize * key.next16() / 15).move(key.next256()  * offset + 700 * (1+key.next16()/100), key.next256()).fill("white").opacity(key.next16() / 17); 

        draw.circle().size(starSize * key.next16() / 15).move(key.next256() * offset * (1+key.next16()/100), key.next256() + 350).fill("white").opacity(key.next16() / 17);     
        draw.circle().size(starSize * key.next16() / 15).move(key.next256() * offset + 700 * (1+key.next16()/100), key.next256() + 350).fill("white").opacity(key.next16() / 17);     

        draw.circle().size(starSize * key.next16() / 15).move(key.next256()  * offset * (1+key.next16()/100), key.next256() + 700).fill("white").opacity(key.next16() / 17);       
        draw.circle().size(starSize * key.next16() / 15).move(key.next256()  * offset + 350 * (1+key.next16()/100), key.next256() + 700).fill("white").opacity(key.next16() / 17);       
        draw.circle().size(starSize * key.next16() / 15).move(key.next256()  * offset + 700 * (1+key.next16()/100), key.next256() + 700).fill("white").opacity(key.next16() / 10);       
    }
}

export default generateStars;