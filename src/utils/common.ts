import snakeize from 'snakeize';
export function format_bigint(num: any, float: number = 16) {
    if (num === null || num === undefined || typeof num.toString != 'function') {
        return '0';
    }
    if (Number.isSafeInteger(Number(num))) {
        return Number(num)
    }
    const temp = num.toString().split('.');
    let n = temp[0] == '-0' ? '0' : temp[0];
    let f: string = (temp[1] ? (temp[1].substring(0, float)) : '').trim();

    f = (/^0+$/.test(f) || !f) ? '' : ('.' + f.replace(/0+$/, ''));

    return n + f;
}

export function format_date(time: number) {
    if (!time) {
        return '0000-00-00 00:00:00';
    }
    const date = new Date(time);
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();
    const i = date.getMinutes();
    const s = date.getSeconds();
    return `${y}-${m > 9 ? m : ('0' + m)}-${d > 9 ? d : ('0' + d)} ${h > 9 ? h : ('0' + h)}:${i > 9 ? i : ('0' + i)}:${s > 9 ? s : ('0' + s)}`;
}

export function object_to_query_string(obj: any) {
    obj = snakeize(obj);
    let s = '';
    for (let k in obj) {
        if (obj[k] === '' || obj[k] === undefined || obj[k] === null) {
            continue;
        }
        s += `${s == '' ? '?' : '&'}${k}=${obj[k]}`
    }
    return s;
}

export function checkForm(data:any){
    
    for(const k in data){
        if(data[k]===undefined||data[k]===null||data[k]===''){
            delete data[k];
        }
    }
    return data
}

export function readable_robot_name(name: string) {
    // return name.replace(/:/g, '');
    return name;
}
