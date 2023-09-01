// const div1 = document.getElementById("div1");
// const div2 = document.getElementById("div2");

// // var isColliding =(div1, div2)=>{
//     let d1_offset= div1.offset();
//     let d1_hieght = div1.outerHeight(true);
//     let d1_width = div1.outerWidth(true);
//     let d1_distanceFromTop = d1_offset.top + d1_hieght;
//     let d1_distanceFromLeft = d1_offset.left + d1_width;
    
//     let d2_offset= div2.offset();
//     let d2_hieght = div2.outerHeight(true);
//     let d2_width = div2.outerWidth(true);
//     let d2_distanceFromTop = d2_offset.top + d2_hieght;
//     let d2_distanceFromLeft = d2_offset.left + d2_width;

//     let not_colliding = (d1_distanceFromTop<d2_offset.top 
//                         || d1_offset.top > d2_distanceFromTop 
//                         || d1_distanceFromLeft < d2_offset.left
//                         || d1_offset.left > d2_distanceFromLeft);
    
//     // return !not_colliding;
// // }
// console.log(not_colliding );

const collisionCheck = (element1, element2)=>{
    const domRect1 = element1.getBoundingClientRect();
    const domRect2 = element2.getBoundingClientRect();

    return !(
        domRect1.top > domRect2.bottom||
        domRect1.right < domRect2.left ||
        domRect1.bottom < domRect2.top||
        domRect1.left > domRect2.right 
        )
}
const div1 = document.getElementById("div1");
const div2 = document.getElementById("div2");
console.log(collisionCheck(div1, div2))
export default collisionCheck;