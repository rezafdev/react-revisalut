import _ from "lodash";
import {BASE_MEDIA_URL} from "./Constants";

export namespace Helpers {

    export function imageUrl(src?: string|null) {
        if(!src) return src ?? undefined
        if(src.startsWith("http")) return src ?? undefined
        return BASE_MEDIA_URL + "/" + ( src.startsWith("/") ? src.substring(1) : src)
    }

    export function enumKeys(someEnum: Object) {
        return Object.keys(someEnum).filter(it => isNaN(parseInt(it)))
    }


    export function enumGetValueByStringKey<T extends { [index: string]: string | number }>(someEnum: T, key: string) {
        return _.nth(Object.entries(someEnum).find(([k, val]) => k === key), 1) ?? null;
    }

    export function enumGetKeyStringByValue<T extends { [index: string]: string | number }>(someEnum: T, value?: string|number) {
        return _.head(
            Object.entries(someEnum).find(([k, val]) => (val.toString() === value?.toString()?.trim())
            )
        )?.toString() ?? null;
    }

    export function isHTML(text?: string | null) {
        if (_.isEmpty(text)) return false
        return (/<\/?[a-z][\s\S]*>/i).test(text ?? '')
    }

    export function setIntervalImmediately(func: Function, interval: number) {
        func();
        return setInterval(func, interval);
    }

    export function arrayAddOrReplaceItem<T>(arr: Array<T>|null|undefined, item: T, opts?: { searchBy?: string, prepend?: boolean}) {
        let list = Array<T>().concat(arr ?? [])
        const exists = _.toNumber(arr?.findIndex(it => _.get(it, opts?.searchBy??'id') === _.get(item, opts?.searchBy??'id') )) >= 0
        if(exists) {
            list = list.map(it => _.get(it, opts?.searchBy??'id') === _.get(item, opts?.searchBy??'id') ? item : it)
        } else {
            if(!!opts?.prepend) {
                list.unshift(item)
            } else {
                list.push(item)
            }
        }
        return list
    }

}
