
/*
 * Copyright (c) 2018. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

function Game_2048() {
    this.error_label = '';
    this.num = [2, 4];
    this.step_round = 0;
    this.step_all = 0;
    this.level = 2;
    this.now_level_number;
    this.level_number = [1, 2, 3, 4];
    this.action_start_val = '';
    this.action_end_val = '';
    this.game_stop_flag = false;
    this.getrandom_num_in_array = function () {
        var i = Math.round(Math.random(0) * (this.num.length - 1));
        return this.num[i];
    };
    this.getrandom_bool = function () {
        return Math.random(0) > 0.5;
    };
    this.calculate_flag = false;
    this.number_to_side = function (item1, item2, item3) {
        if (item1 === 0) {
            item1 = item2;
            item2 = item3;
            item3 = 0;
            if (item1 === 0) {
                item1 = item2;
                item2 = item3;
            }
        } else {
            if (item2 === 0) {
                item2 = item3;
                item3 = 0;
            }
        }
        if (item1 === item2) {
            item1 = item1 + item1;
            item2 = item3;
            item3 = 0;
            if (item1 === item2) {
                item1 = item1 + item1;
            }
        } else {
            if (item2 === item3) {
                item2 = item2 + item2;
                item3 = 0;
            }
        }
        return [item1, item2, item3];
    };
    this.array_equals = function (arr1, arr2) {
        if (typeof arr1 !== typeof arr2) {
            if (typeof arr1 === 'array') {
                return false;
            }
        }
        if (arr1.length !== arr2.length) {
            return false;
        }
        for (var i = 0; i < arr1.length; ++i) {
            if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
                if (!arr1[i].equals(arr2[i])) {
                    return false;
                }
            } else if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    };
    this.max = function () {
        return Math.max.apply(Math, this.item_val);
    };
    this.min = function () {
        return Math.min.apply(Math, this.item_val);
    };
    this.check_any_result = function (before_data) {
        var i = before_data.slice();
        var w = [0, 1, 3, 4, 6, 7];
        var h = [0, 1, 2, 3, 4, 5];
        for (var k in w) {
            k = parseInt(w[k]);
            if (i[k] === i[k + 1]) {
                return true;
            }
        }
        for (var k in h) {
            k = parseInt(h[k]);
            if (i[k] === i[k + 3]) {
                return true;
            }
        }
        return false;
    };
    this.end = function () {

    };
    this.move = function (type) {
        if (this.calculate_flag) {
            return false;
        } else {
            this.calculate_flag = true;
        }
        if (this.game_stop_flag) {
            this.calculate_flag = false;
            document.getElementById(this.error_label).innerHTML = 'this round already ended!you can try start again.';
            console.log('this round already ended!you can try start again.');
            this.end();
            return false;
        }
        this.action_start_val = this.item_val.slice();
        var i = 0, rs = '';
        switch (type) {
            case 'left':
                for (i = 0; i < this.item_val.length; i = i + 3) {
                    rs = this.number_to_side(this.item_val[i], this.item_val[i + 1], this.item_val[i + 2]);
                    this.item_val[i] = rs[0];
                    this.item_val[i + 1] = rs[1];
                    this.item_val[i + 2] = rs[2];
                }
                break;
            case 'right':
                for (i = 2; i < this.item_val.length; i = i + 3) {
                    rs = this.number_to_side(this.item_val[i], this.item_val[i - 1], this.item_val[i - 2]);
                    this.item_val[i] = rs[0];
                    this.item_val[i - 1] = rs[1];
                    this.item_val[i - 2] = rs[2];
                }
                break;
            case 'top':
                for (i = 0; i < this.item_val.length / 3; ++i) {
                    rs = this.number_to_side(this.item_val[i], this.item_val[i + 3], this.item_val[i + 3 + 3]);
                    this.item_val[i] = rs[0];
                    this.item_val[i + 3] = rs[1];
                    this.item_val[i + 3 + 3] = rs[2];
                }
                break;
            case 'bottom':
                for (i = 6; i < this.item_val.length; ++i) {
                    rs = this.number_to_side(this.item_val[i], this.item_val[i - 3], this.item_val[i - 3 - 3]);
                    this.item_val[i] = rs[0];
                    this.item_val[i - 3] = rs[1];
                    this.item_val[i - 3 - 3] = rs[2];
                }
                break;
            default:
        }
        this.action_end_val = this.item_val.slice();
        //在填充之前 判断是否存在空的
        if (this.array_equals(this.action_end_val, this.action_start_val)) {
            //如果本次行为没有产生任何影响直接放弃本次操作
            if (this.min() !== 0) {
                //说明不为空
                if (!this.check_any_result(this.action_start_val)) {
                    /*不存在其他结果 游戏结束*/
                    this.calculate_flag = false;
                    this.game_stop_flag = true;
                    console.log('you got biggist number ' + this.max() + ' in this round.');
                    try {
                        document.getElementById(this.error_label).innerHTML = '您的最高得分为' + this.max();
                    } catch (e) {
                    }
                    return false;
                }
            }
            this.calculate_flag = false;
            return false;
        }
        /*  填充和显示 */
        var tmp_filled = 0;
        for (i = 0; i < this.item.length; ++i) {
            if (this.item_val[i] === 0) {
                if ((tmp_filled === 99999 && tmp_filled < this.now_level_number) || (this.getrandom_bool() && tmp_filled < this.now_level_number)) {
                    this.item_val[i] = this.getrandom_num_in_array();
                    ++tmp_filled;
                }
            }
            if (this.item_val[i] !== 0) {
                this.item[i].innerText = this.item_val[i];
            } else {
                this.item[i].innerText = '';
            }
        }
        ++this.step_all;
        ++this.step_round;
        try {
            document.getElementById(this.count_round).innerHTML = this.step_round;
            document.getElementById(this.count_all).innerHTML = this.step_all;
        } catch (e) {
            //TODO handle the exception
        }
        this.calculate_flag = false;
    };

    this.init = function (container, option) {
        if (eval('(' + option + ')')) {
            this.option = eval('(' + option + ')');
            if (typeof(this.option.count_round) !== 'undefined' && this.option.count_round !== '') {
                this.count_round = this.option.count_round;
            }
            if (typeof(this.option.count_all) !== 'undefined' && this.option.count_all !== '') {
                this.count_all = this.option.count_all;
            }
            if (typeof(this.option.error_label) !== 'undefined' && this.option.error_label !== '') {
                this.error_label = this.option.error_label;
            }
            if (typeof(this.option.level) !== 'undefined' && this.option.level !== '') {
                this.level = this.option.level - 1;
                this.now_level_number = this.level_number[this.level];
            }
        }
        this.item = container.children;
        this.item_val = new Array(container.childElementCount);
        var tmp_val = 0;
        this.step_round = 0;
        this.game_stop_flag = false;
        this.now_level_number = this.level_number[this.level];
        var tmp_filled = 0;
        for (var i = 0; i < this.item.length; ++i) {
            tmp_val = 0;
            if ((tmp_filled === 0 && tmp_filled < this.now_level_number) || (this.getrandom_bool() && tmp_filled < this.now_level_number)) {
                tmp_val = this.getrandom_num_in_array();
                this.item[i].innerHTML = tmp_val;
                ++tmp_filled;
            } else {
                this.item[i].innerHTML = '';
            }
            this.item_val[i] = tmp_val;
        }
        try {
            document.getElementById(this.count_round).innerHTML = 0;
        } catch (e) {
        }
        document.onkeyup = function (event) {
            switch (event.keyCode) {
                case 37:
                    gamer_factory.move('left');
                    break;
                case 39:
                    gamer_factory.move('right');
                    break;
                case 38:
                    gamer_factory.move('top');
                    break;
                case 40:
                    gamer_factory.move('bottom');
                    break;
                default:
            }
        }
    }
}

var gamer_factory = new Game_2048();