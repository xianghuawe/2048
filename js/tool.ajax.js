/*
 * Copyright (c) 2018. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

function getAjaxObject() {
    return new XMLHttpRequest();
}


function post(obj,url,data) {
    obj.open('POST',url,true);
    obj.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    obj.send(data);
}
