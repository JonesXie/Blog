# moment.js常用方法

## 引入moment.js

```js
import moment from 'moment'
```

## 获取本周周一和周日日期

```js
export function getCurrentWeek() {
  const start = moment().weekday(1).format('YYYY-MM-DD'); //本周一
  const end = moment().weekday(7).format('YYYY-MM-DD'); //本周日
  return [start, end]
}
```

## 获取前 i 周的周一和周日日期，并以数组的方式返回

> 当 i=1，获取的是上周一和上周日的日期  
> 当 i=2，获取的是上上周一和上上周日的日期  
> ...以此类推  

```js
export function getLastWeek(i) {
  let weekOfDay = parseInt(moment().format('E')); //计算今天是这周第几天
  let last_monday = moment().subtract(weekOfDay + 7 * i - 1, 'days').format('YYYY-MM-DD'); //周一日期
  let last_sunday = moment().subtract(weekOfDay + 7 * (i - 1), 'days').format('YYYY-MM-DD'); //周日日期
  return [last_monday, last_sunday]
}
```

## 获取后 i 周的周一和周日日期，并以数组的方式返回

> 当 i=1，获取的是下周一和下周日的日期  
> 当 i=2，获取的是下下周一和下下周日的日期  
> ...以此类推  

```js
export function getNextWeek(i) {
  let weekOfDay = parseInt(moment().format('E')); //计算今天是这周第几天
  let next_monday = moment().add((7 - weekOfDay) + 7 * (i - 1) + 1, 'days').format('YYYY-MM-DD'); //周一日期
  let next_sunday = moment().add((7 - weekOfDay) + 7 * i, 'days').format('YYYY-MM-DD'); //周日日期
  return [next_monday, next_sunday]
}
```

## 传入指定日期

>返回传入日期的月份开始日期和结束日期  
> 返回数组  

```js
export function getOnMonth(valDate) {
  let start = moment(valDate).startOf("month").format("YYYY-MM-DD"); //计算指定日期月份第一天
  let end = moment(valDate).endOf("month").format("YYYY-MM-DD"); //计算指定日期月份最后一天
  return [start, end]
}
```
