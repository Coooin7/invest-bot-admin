import type { BigNumber } from "@ethersproject/bignumber"

export function format_bigint(num: BigNumber, float: number = 4) {
    if (num === null || num === undefined) {
        return '0';
    }

    const temp = num.toString().split('.');
    let n = temp[0] == '-0' ? '0' : temp[0];
    let f = temp[1] ? (temp[1].substring(0, float)) : '';
    if (f === '' || Number.parseInt(f) <= 0) {
        return n;
    }
    f = f ? ('.' + f) : f;

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

export function object_to_query_string(obj:any){
    let s = '';
    for(let k in obj){
        if(obj[k]===''){
            continue;
        }
        s += `${s==''?'?':'&'}${k}=${obj[k]}`
    }
    return s;
}

export function readable_robot_name(name:string){
    return name.replace(/:/g,'');
}